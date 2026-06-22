# Shopify OpenNext Cloudflare app

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It has been integrated with [Shopify](https://www.shopify.com) using [Shopify App Bridge](https://shopify.dev/docs/api/app-home/app-bridge-web-components)

## Note

Shopify polaris as an unversioned cdn is subject to change beyond the control of this project.
There is a [snapshot](src/lib/polaris-snapshot-2026-05-30.js) of the version used during development so that, should problems arise in the future,
it could be substituted into [layout.tsx](src/app/layout.tsx)

Also, the project is limited to React v18 due to type compatibility issues with polaris and React v19

## Getting Started

Create a Shopify dev app [see docs](https://shopify.dev/docs/apps/build/dev-dashboard)

Add these to your `.dev.vars` file
```
NEXTJS_ENV=development
SHOPIFY_CLIENT_ID=<your shopify client id> * 
SHOPIFY_REDIRECT_URI=https://localhost:3000
SHOPIFY_CLIENT_SECRET=<your shopify secret> *

# * for production/staging add these as secrets
#   with wrangler or in the Cloudflare dashboard
```

## Getting Started with OpenNext on Cloudflare

Read the documentation at https://opennext.js.org/cloudflare.

## Develop

Create the app db
```bash
wrangler d1 create shopify-app-d1
```

Create the shop table
```bash
wrangler d1 migrations apply shopify-app-d1
wrangler d1 migrations apply shopify-app-d1 --remote
```

Run the Next.js development server:
```bash
npm run dev:https
# or similar package manager command
# https needed to work in shopify admin dashboard
```

Application runs at [https://localhost:3000](https://localhost:3000)

```bash
npm run shopify-dev
# or similar package manager command
```

Open the link shown in the terminal with your browser to see the result.

For shopify theme extensions, use the 
[shopify cli to generate an extensions folder](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/build)

Staging - Shopify
```bash
npm run shopify-dev-deploy
# or similar package manager command
```

## Preview 

Preview the application locally on the Cloudflare runtime:

```bash
npm run preview
# or similar package manager command
```

## Deploy

Deploy the application to Cloudflare:

Production - Cloudflare
```bash
npm run deploy
# or similar package manager command
```

Production - Shopify
```bash
# not yet implemented
npm run shopify-deploy-prod
# or similar package manager command
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
