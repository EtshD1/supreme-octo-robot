/**
 * MOCK DATA LAYER
 * ---------------
 * Pretend this file talks to a real database or API.
 * Every function is `async` and waits a little (see `delay`) so you can
 * actually SEE loading states, streaming and caching in the lessons.
 *
 * None of these functions are cached on purpose. Each lesson decides
 * how to fetch them (cached with "use cache", streamed with <Suspense>, ...).
 */

export type User = { id: string; name: string; role: string; email: string };
export type Post = { slug: string; title: string; body: string; authorId: string };
export type Product = { id: string; name: string; category: string; price: number };
export type Photo = { id: string; title: string; color: string };
export type Message = { id: number; author: string; text: string };

export const users: User[] = [
  { id: "1", name: "Ada Lovelace", role: "Engineer", email: "ada@example.com" },
  { id: "2", name: "Alan Turing", role: "Researcher", email: "alan@example.com" },
  { id: "3", name: "Grace Hopper", role: "Admiral", email: "grace@example.com" },
];

export const posts: Post[] = [
  {
    slug: "hello-nextjs",
    title: "Hello, Next.js",
    body: "Next.js is a React framework for building full-stack web apps.",
    authorId: "1",
  },
  {
    slug: "server-components",
    title: "Why Server Components?",
    body: "They render on the server, so they ship zero JavaScript to the browser.",
    authorId: "2",
  },
  {
    slug: "caching-explained",
    title: "Caching, Explained",
    body: "With Cache Components you opt in to caching with the \"use cache\" directive.",
    authorId: "3",
  },
];

export const products: Product[] = [
  { id: "p1", name: "Mechanical Keyboard", category: "tech", price: 120 },
  { id: "p2", name: "USB-C Hub", category: "tech", price: 45 },
  { id: "p3", name: "Coffee Mug", category: "kitchen", price: 12 },
  { id: "p4", name: "French Press", category: "kitchen", price: 35 },
  { id: "p5", name: "Desk Plant", category: "home", price: 18 },
  { id: "p6", name: "Reading Lamp", category: "home", price: 60 },
];

export const photos: Photo[] = [
  { id: "1", title: "Sunset", color: "#f97316" },
  { id: "2", title: "Ocean", color: "#0ea5e9" },
  { id: "3", title: "Forest", color: "#22c55e" },
  { id: "4", title: "Lavender", color: "#a855f7" },
  { id: "5", title: "Sand", color: "#eab308" },
  { id: "6", title: "Rose", color: "#f43f5e" },
];

/** Fake network latency. */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------- Read functions ----------

export async function getUsers() {
  await delay(500);
  return users;
}

export async function getUser(id: string) {
  await delay(500);
  return users.find((u) => u.id === id) ?? null;
}

export async function getPosts() {
  await delay(800);
  return posts;
}

export async function getPost(slug: string) {
  await delay(300);
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getProducts(filters: { q?: string; category?: string } = {}) {
  await delay(400);
  return products.filter((p) => {
    const matchesQuery = !filters.q || p.name.toLowerCase().includes(filters.q.toLowerCase());
    const matchesCategory = !filters.category || p.category === filters.category;
    return matchesQuery && matchesCategory;
  });
}

export async function getPhoto(id: string) {
  await delay(100);
  return photos.find((p) => p.id === id) ?? null;
}

// ---------- A tiny in-memory "database" for mutations ----------
// It lives in server memory, so it resets when the dev server restarts.

const db = globalThis as unknown as { guestbook?: Message[] };
db.guestbook ??= [{ id: 1, author: "Next.js", text: "Welcome to the guestbook!" }];

export async function getMessages() {
  await delay(300);
  return [...db.guestbook!];
}

export async function addMessage(author: string, text: string) {
  await delay(300);
  db.guestbook!.push({ id: Date.now(), author, text });
}

export async function clearMessages() {
  await delay(100);
  db.guestbook = [];
}
