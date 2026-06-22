import { ShopifyNav } from '@/components/shopify-nav'
import { ShopData, ShopDetails } from '@/components/shop-details'

type WelcomePageProps = {
  children?: JSX.Element
  heading: string
  shopData: ShopData
}

export const WelcomePage = ({ heading, shopData, children }: WelcomePageProps) => <>
  <ShopifyNav />
  <s-page heading={heading}>
    {children}
    {shopData && <ShopDetails shopData={shopData} />}
  </s-page>
</>
