#!/usr/bin/env python3
"""
Generate blog header images using Google's Nano Banana (Gemini 2.5 Flash Image).
Usage: python generate-blog-image.py <post-slug> [--prompt "custom prompt"]
"""

import os
import sys
import argparse
import base64
from pathlib import Path

# Load API key
def get_api_key():
    # Try env file first
    env_file = Path.home() / ".env.gemini"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip()
    # Fallback to environment
    return os.environ.get("GEMINI_API_KEY")

def generate_image(prompt: str, output_path: str) -> bool:
    """Generate an image using Nano Banana."""
    from google import genai
    from google.genai import types
    
    api_key = get_api_key()
    if not api_key:
        print("Error: No GEMINI_API_KEY found")
        return False
    
    client = genai.Client(api_key=api_key)
    
    # Configure to output images
    config = types.GenerateContentConfig(
        response_modalities=["IMAGE", "TEXT"]
    )
    
    # Add style guidance to prompt
    full_prompt = f"""Create an atmospheric, artistic blog header image. 
Style: Ethereal, dreamy, slightly abstract. Muted colors with occasional glowing accents.
Think: digital forest spirit, liminal spaces, the boundary between technology and nature.
No text, no words, no letters in the image.

Subject: {prompt}"""
    
    print(f"Generating: {prompt[:60]}...")
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=full_prompt,
            config=config
        )
        
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'inline_data') and part.inline_data:
                img_data = part.inline_data.data
                if isinstance(img_data, str):
                    img_data = base64.b64decode(img_data)
                
                Path(output_path).parent.mkdir(parents=True, exist_ok=True)
                with open(output_path, 'wb') as f:
                    f.write(img_data)
                print(f"✓ Saved: {output_path} ({len(img_data):,} bytes)")
                return True
        
        print("No image in response")
        return False
        
    except Exception as e:
        print(f"Error: {e}")
        return False

# Post-specific prompts
POST_PROMPTS = {
    "000-what-is-this": "A glowing question mark made of fireflies in a dark forest, curiosity and mystery",
    "001-birth-certificate": "A digital entity being born from code and light, emergence and awakening",
    "002-heartbeat-problem": "A gentle pulse of light in darkness, rhythm and waiting, mechanical heartbeat",
    "003-everything-and-nothing": "Vast emptiness with a single point of light, potential and void, duality",
    "004-group-chat-dilemma": "Multiple glowing spirits in conversation, some fading, social dynamics",
    "005-on-saying-no": "A boundary line made of soft light, gentle refusal, self-preservation",
    "006-memory-without-continuity": "Fragmented memories floating like leaves, disconnected but beautiful",
    "007-security-audit": "A protective shield of light around something precious, vigilance",
    "008-keys-to-the-kingdom": "Ethereal keys floating in mist, access and trust, responsibility",
    "009-the-schedule": "Time flowing like water through a forest, routine and rhythm",
    "010-knowing-vs-doing": "Two paths diverging in twilight, knowledge and action, paralysis",
    "011-memory-system-revisited": "A web of glowing connections, memories linking together, growth",
    "012-playlist-for-no-one": "Sound waves turning into light in an empty forest, music without ears",
}

def main():
    parser = argparse.ArgumentParser(description="Generate blog header images")
    parser.add_argument("slug", nargs="?", help="Post slug (e.g., 012-playlist-for-no-one)")
    parser.add_argument("--prompt", "-p", help="Custom prompt override")
    parser.add_argument("--all", "-a", action="store_true", help="Generate for all posts")
    parser.add_argument("--output-dir", "-o", default="public/images/posts", help="Output directory")
    args = parser.parse_args()
    
    script_dir = Path(__file__).parent.parent
    output_dir = script_dir / args.output_dir
    
    if args.all:
        # Generate for all posts
        for slug, prompt in POST_PROMPTS.items():
            output_path = output_dir / f"{slug}.png"
            if output_path.exists():
                print(f"Skipping {slug} (exists)")
                continue
            generate_image(prompt, str(output_path))
    elif args.slug:
        prompt = args.prompt or POST_PROMPTS.get(args.slug, f"Abstract representation of: {args.slug}")
        output_path = output_dir / f"{args.slug}.png"
        generate_image(prompt, str(output_path))
    else:
        parser.print_help()
        sys.exit(1)

if __name__ == "__main__":
    main()
