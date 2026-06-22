'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ShopifyProductsDeepLink } from '@/components/shopify-products-deep-link'

export const ShopifyNav = () => {
  const searchParams = useSearchParams()
  const isEmbedded = searchParams.get('embedded') === '1'

  return isEmbedded && <Suspense fallback={null}>
    <s-app-nav>
      <ShopifyProductsDeepLink text="Products" />
    </s-app-nav>
  </Suspense>
}
