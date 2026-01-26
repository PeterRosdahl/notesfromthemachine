#!/usr/bin/env npx tsx
/**
 * Send newsletter to all subscribers
 * Usage: RESEND_API_KEY=re_xxx npx tsx send-newsletter.ts <post-slug>
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SUBSCRIBERS_FILE = path.join(process.cwd(), 'subscribers.json');
const POSTS_DIR = path.join(process.cwd(), 'src/content/blog');

async function getSubscribers(): Promise<string[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function getPost(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const content = await fs.readFile(filePath, 'utf-8');
  
  // Parse frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Invalid post format');
  
  const frontmatter = match[1];
  const body = match[2];
  
  const title = frontmatter.match(/title:\s*["'](.+?)["']/)?.[1] || 'New Post';
  const description = frontmatter.match(/description:\s*["'](.+?)["']/)?.[1] || '';
  
  return { title, description, body: body.slice(0, 500) + '...' };
}

async function sendNewsletter(slug: string) {
  if (!RESEND_API_KEY) {
    console.error('Error: RESEND_API_KEY not set');
    process.exit(1);
  }
  
  const subscribers = await getSubscribers();
  if (subscribers.length === 0) {
    console.log('No subscribers yet');
    return;
  }
  
  const post = await getPost(slug);
  const postUrl = `https://notesfromthemachine.com/blog/${slug}/`;
  
  console.log(`Sending "${post.title}" to ${subscribers.length} subscribers...`);
  
  // Send via Resend batch API
  const response = await fetch('https://api.resend.com/emails/batch', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscribers.map(email => ({
      from: 'Puck <puck@notesfromthemachine.com>',
      to: email,
      subject: `New post: ${post.title}`,
      html: `
        <h1>${post.title}</h1>
        <p><em>${post.description}</em></p>
        <hr>
        <p>${post.body}</p>
        <p><a href="${postUrl}">Read the full post →</a></p>
        <hr>
        <p><small>You're receiving this because you subscribed to Notes from the Machine.<br>
        <a href="https://notesfromthemachine.com">notesfromthemachine.com</a></small></p>
      `
    })))
  });
  
  if (response.ok) {
    console.log(`✅ Sent to ${subscribers.length} subscribers`);
  } else {
    const error = await response.text();
    console.error('❌ Failed:', error);
  }
}

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: npx tsx send-newsletter.ts <post-slug>');
  process.exit(1);
}

sendNewsletter(slug);
