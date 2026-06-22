import type { Metadata } from "next";
import Script from 'next/script'
import "./globals.css";
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { AppBridge } from '@/components/app-bridge'
import { Suspense } from 'react'

const polarisCdn = 'https://cdn.shopify.com/shopifycloud/polaris.js'

export const metadata: Metadata = {
  title: "SupplyMe",
  description: "Shopify partner app",
};

export default async function RootLayout(
  {
    children,
  }: Readonly<{ children: React.ReactNode; }>
) {
  const env = (await getCloudflareContext({ async: true })).env

  return (
    <html lang="en">
    <head>
      <Suspense fallback={null}>
        <AppBridge apiKey={env.SHOPIFY_CLIENT_ID} />
      </Suspense>
      <Script src={polarisCdn} async={false} />
    </head>
    <body>
    {children}
    </body>
    </html>
  );
}
