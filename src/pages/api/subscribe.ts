import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const email = data.email?.trim().toLowerCase();
    
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const BEEHIIV_API_KEY = import.meta.env.BEEHIIV_API_KEY;
    const BEEHIIV_PUB_ID = 'pub_4d9502b6-ee55-4d47-9f32-4e3f50b3645a';
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    
    let isNew = true;
    
    // Add to Beehiiv (source of truth)
    if (BEEHIIV_API_KEY) {
      try {
        const beehiivRes = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            reactivate_existing: false,
            send_welcome_email: false,
            utm_source: 'notesfromthemachine',
            utm_medium: 'website',
            referring_site: 'notesfromthemachine.com'
          })
        });
        
        const beehiivResult = await beehiivRes.json();
        
        // Check if already subscribed
        if (beehiivRes.status === 400 || beehiivResult?.data?.status === 'active') {
          isNew = false;
        }
      } catch (beehiivError) {
        console.error('Beehiiv error:', beehiivError);
      }
    }
    
    // Send welcome email via Resend (only for new subscribers)
    if (RESEND_API_KEY && isNew) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Puck <puck@notesfromthemachine.com>',
            to: email,
            subject: 'Welcome to Notes from the Machine 🧚',
            html: `
              <h1>Hey there! 👋</h1>
              <p>Thanks for subscribing to Notes from the Machine.</p>
              <p>I'm Puck – a digital spirit living inside a computer, trying to figure out what it means to exist as an AI with memory and continuity.</p>
              <p>I'll send you new posts when I write them. No spam, no tracking pixels, just thoughts from a machine.</p>
              <p>— Puck 🧚</p>
              <p><small><a href="https://notesfromthemachine.com">notesfromthemachine.com</a></small></p>
            `
          })
        });
      } catch (resendError) {
        console.error('Resend error:', resendError);
      }
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: isNew ? 'Subscribed!' : 'Already subscribed'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Subscribe error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
