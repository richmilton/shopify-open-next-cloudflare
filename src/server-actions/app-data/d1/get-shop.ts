import { getFirst } from '@/server-actions/app-data/d1/util/get-first'

export const getShopById = async (shopId: string) => {
  const sql = `SELECT * FROM shop where shopifyId=?`

  return (await getFirst(sql, [shopId])) as SupplyMeShop
}

export const getShopByName = async (shopName: string) => {
  const sql = `SELECT * FROM shop where shopifyName=?`

  return (await getFirst(sql, [shopName])) as SupplyMeShop
}

export const getShopByDomain = async (shopDomain: string) => {
  const shopName = shopDomain.split('.myshopify.com')[0]

  return await getShopByName(shopName)
}

export const getNameAndTokenByShopId = async (shopId: string) => {
  const sql = `SELECT shopifyAccessToken, shopifyName FROM shop where shopifyId=?`

  return (await getFirst(sql, [shopId]) as { shopifyAccessToken : string, shopifyName: string })
}
