'use server'
import { runQuery } from '@/server-actions/app-data/d1/util/run-query'
import { getFirst } from '@/server-actions/app-data/d1/util/get-first'

type Shop = {
  shopifyName: string
  newInstall: boolean
}

export const upsertShop = async (shopifyId: string, name: string, token: string, currencyCode: string): Promise<Shop> => {
  const findSql = `SELECT * FROM shop WHERE shopifyName = ?`

  const result = await getFirst(findSql, [name])  as SupplyMeShop

  if (result) {
    const updateSql = `UPDATE shop SET shopifyId=?, shopifyAccessToken=?, currencyCode=? WHERE shopifyName = ?`
    await runQuery(updateSql, [shopifyId, token, currencyCode, name])

    return {
      shopifyName: result.shopifyName,
      newInstall: false
    }
  }

  const sql = `INSERT INTO Shop (shopifyId, shopifyName, shopifyAccessToken, currencyCode, supplyMeSubscriber) values(?,?,?,?,?)`
  await runQuery(sql, [shopifyId, name, token, currencyCode, true])

  return {
    shopifyName: name,
    newInstall: true
  }
}
