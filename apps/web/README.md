This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

### Visitor location logs

On Vercel, middleware writes a JSON `page_visit` event for page GET requests,
including the path, public IP, and Vercel's approximate country, region, and city.
After deploying, open the project's **Logs**, include middleware / info logs,
and search for `page_visit`. Missing location fields are `null`.

Prefetches, API calls, and static assets are excluded. These are server request
logs, not a count of human clicks: bots and reloads can appear, while same-page
anchors, external links, and client-cached navigation do not reach middleware.
VPNs and proxies can affect the location. Local development does not emit these
events. Query strings, cookies, and authentication tokens are not logged.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
