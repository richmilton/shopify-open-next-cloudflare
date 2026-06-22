'use server'
import api from '@/server-actions/shopify-data/api'
import { getShopByDomain } from '@/server-actions/app-data/d1/get-shop'

type ThemeFile = {
  filename: string
}

export type Theme = {
  name: string
  id: string
  files: ThemeFile[]
}

export type ShopDetails = {
  id: string
  name: string
  myshopifyDomain: string
  contactEmail: string
  shopOwnerName: string
  themes?: Theme[]
  currencyCode: string
  shipsToCountries: string[]
}

type ResponseType = {
  data: {
    shop: ShopDetails,
    themes: {
      nodes: Theme[]
    }
  }
}

const query = `
  {
    shop {
      id
      name
      myshopifyDomain
      contactEmail
      shopOwnerName
      currencyCode
      shipsToCountries
    }
    themes(first: 10) {
      nodes {
        name
        id
        files(filenames: ["assets/accordion-custom.js"], first: 10) {
          nodes {
            filename
           }
         }
      }
    }
  }
`

export const getShopifyShopDetails = async (shopName: string, newAccessToken?: string) => {
  let accessToken

  if (!newAccessToken) {
    const shop = await getShopByDomain(shopName)
    accessToken = shop?.shopifyAccessToken
  } else {
    accessToken = newAccessToken
  }

  const response =  await api.callGraphql(shopName, query, accessToken) as ResponseType

  if (response?.data) {
    const { data: { shop, themes: { nodes: themes } } } = response

    return {
      ...shop, themes
    }
  }

  return null
}
