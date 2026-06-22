import { getAuthUrlWithCode, getToken } from '@/server-actions/shopify-data/oauth'
import { getShopifyShopDetails } from '@/server-actions/shopify-data/get-shopify-shop-details'
import { upsertShop } from '@/server-actions/app-data/d1/upsert-shop'
import { redirect, RedirectType } from 'next/navigation'
import { WelcomePage } from '@/components/welcome-page'

const languageContent = {
  en: {
    welcome: 'Welcome to Shopify OpenNext Cloudflare ',
    thankYou: 'Thank you for using the Shopify OpenNext Cloudflare app template.',
    tokenUpdateHeading: 'Your Shopify api token was successfully updated',
    tokenUpdateText: 'You are seeing this message because your token was refreshed. This is could be because..',
    tokenUpdateList1: 'You installed/re-installed your app',
    tokenUpdateList2: 'You released a new version',
  }
}

const defaultLanguage = 'en'

export default async function page({ searchParams }: { searchParams: AuthParams }) {
  const t = languageContent[defaultLanguage]
  const { code, shop: shopDomain } = await searchParams

  if (!code && !shopDomain) {
    return <s-page>
      Missing parameters
    </s-page>
  }

  if (!code && shopDomain) {
    console.log('first load from admin dashboard')

    const shopData = (await getShopifyShopDetails(shopDomain))

    if (shopData) {
      console.log('shop found with existing token')

      return <WelcomePage heading={t.welcome} shopData={shopData} />
    } else {
      console.log('refreshing token')

      const link = await getAuthUrlWithCode(shopDomain)

      redirect(link, RedirectType.replace)
    }
  }

  if (code) {
    console.log('processing token response', code)

    const tokenResponse: { access_token: string } = (await getToken(shopDomain, code as string)) as TokenResponse
    const freshShopData = (await getShopifyShopDetails(shopDomain, tokenResponse.access_token))

    if (freshShopData) {
      console.log('shop found with new token', freshShopData)

      const shopifyId = freshShopData?.id.split('gid://shopify/Shop/')[1]
      const { newInstall } = await upsertShop(shopifyId, freshShopData.name, tokenResponse.access_token, freshShopData.currencyCode)
      const updateMessage = newInstall
        ? <s-section heading={t.welcome}>
            <s-paragraph>
              {t.thankYou}
            </s-paragraph>
          </s-section>
        : <s-section heading={t.tokenUpdateHeading}>
            <s-paragraph>
              {t.tokenUpdateText}
              <s-unordered-list>
                <s-list-item>{t.tokenUpdateList1}</s-list-item>
                <s-list-item>{t.tokenUpdateList2}</s-list-item>
              </s-unordered-list>
            </s-paragraph>
          </s-section>

      return <WelcomePage heading={t.welcome} shopData={freshShopData}>
        {updateMessage}
      </WelcomePage>
    }
  }

  return <s-page>
    <s-section>
      Something went wrong
    </s-section>
  </s-page>
}
