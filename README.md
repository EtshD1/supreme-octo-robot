# Learn Next.js by Example

Small, runnable lessons covering the core features of Next.js 16.

## Start

```bash
npm install
npm run dev
```

Open [localhost:3000/learn](http://localhost:3000/learn).

## How it works

Each lesson is a real page. Read it, try the demo, then open the files it lists.

- Lessons: `src/app/learn/`
- Mock data: `src/lib/data.ts`
- API routes: `src/app/api/`
- Proxy: `src/proxy.ts`

## Lessons

**Routing**: pages & layouts · linking · dynamic routes · route groups · parallel routes · intercepting routes
**Rendering**: server vs. client components · static, dynamic & streaming
**Data**: fetching · caching · server actions · search params · cookies & headers
**More**: errors & 404s · route handlers · proxy · metadata · images & fonts

> Cache Components is on (`next.config.ts`), so anything that reads the request has to sit inside `<Suspense>` or use `"use cache"`.
