type AuthParams = Promise<{ shop: string, code?: string }>

type TokenResponse = {
  access_token: string
  id_token: string
  expires_in?: number
}

type SupplierRouteParams = Promise<{ shopId: string, supplierName?: string, productError?: string }>

type SupplyMeShop = {
  id: string
  shopifyName: string
  shopifyId: string
  shopifyAccessToken: string
  supplyMeSubscriber: number
  currencyCode: CurrencyCodeHack
}

// hack because shopify unhelpfully does not export this type
// this seems to shut the ts transpiler up
type CurrencyCodeHack = CurrencyCode
