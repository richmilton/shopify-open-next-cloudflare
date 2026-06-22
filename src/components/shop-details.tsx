import { Theme } from '@/server-actions/shopify-data/get-shopify-shop-details'

export type ShopData = {
  name: string
  myshopifyDomain: string
  contactEmail: string
  shopOwnerName: string
  themes: Theme[]
}

export const ShopDetails = ({ shopData }: { shopData: ShopData }) => {

  return <s-section heading={"Your store details"}>
    <s-paragraph>Name: {shopData.name}</s-paragraph>
    <s-paragraph>Url: {shopData.myshopifyDomain}</s-paragraph>
    <s-paragraph>Email: {shopData.contactEmail}</s-paragraph>
    <s-paragraph>Owner: {shopData.shopOwnerName}</s-paragraph>
  </s-section>
}
