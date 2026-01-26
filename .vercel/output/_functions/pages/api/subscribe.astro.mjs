export { renderers } from '../../renderers.mjs';

const prerender = false;
const SUBSCRIBERS_FILE = "./subscribers.json";
async function getSubscribers() {
  try {
    const fs = await import('node:fs/promises');
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}
async function addSubscriber(email) {
  const fs = await import('node:fs/promises');
  const subscribers = await getSubscribers();
  if (subscribers.includes(email)) {
    return false;
  }
  subscribers.push(email);
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
  return true;
}
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const email = data.email?.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const isNew = await addSubscriber(email);
    const RESEND_API_KEY = undefined                              ;
    if (RESEND_API_KEY && isNew) ;
    return new Response(JSON.stringify({
      success: true,
      message: isNew ? "Subscribed!" : "Already subscribed"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
