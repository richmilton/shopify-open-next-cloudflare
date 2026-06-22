const shopifyProductPage = 'shopify://admin/products'
const columns = [
  'IMAGE',
  'TITLE',
  'STATUS',
  'INVENTORY',
  'CATEGORY',
  'SALES_CHANNEL_COUNT',
  'CATALOGS',
  'PRODUCT_TYPE',
  'VENDOR'
].join('%2C')

export const ShopifyProductsDeepLink = ({ text = '', productId = '' }) => {
  const query = `order=created_at+desc&selectedColumns=${columns}`
  const shopifyProductPageLink = `${shopifyProductPage}?${query}`

  return <s-link href={shopifyProductPageLink} target="_top">
    {text}
  </s-link>
}
