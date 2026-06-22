import { getShopById } from '@/server-actions/app-data/d1/get-shop'

import { notFound } from 'next/navigation'

export default async function page({ params }: { params: SupplierRouteParams }) {
  const { shopId } = await params
  const shop = await getShopById(shopId)

  if (!shop) {
    notFound()
  }

  const heading = `External NextJs example ${shop.shopifyName}`
  const registerLink = `/supplier/${shopId}/register`

  return <s-page heading={heading}>
    <s-section heading="Are you already a Shopify partner?">
      <s-paragraph>
        Example having clicked the extension button
      </s-paragraph>
    </s-section>
  </s-page>
}
