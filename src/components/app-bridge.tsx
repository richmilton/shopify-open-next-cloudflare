'use client'
import { useSearchParams } from 'next/navigation'

const appBridgeCdn = 'https://cdn.shopify.com/shopifycloud/app-bridge.js'

export const AppBridge = ({ apiKey }: { apiKey: string }) => {
  const searchParams = useSearchParams()
  const embedded = searchParams.get('embedded') as string

  return embedded === '1' && <script src={appBridgeCdn} async={false} data-api-key={apiKey} />
}
