'use server'

import { getCloudflareContext } from "@opennextjs/cloudflare"

const shopifyPath = 'admin/oauth'

export const getAuthUrlWithCode = async (storeName: string): Promise<string> => {
  const env = (await getCloudflareContext({ async: true })).env

  return `https://${storeName}/${shopifyPath}/authorize?client_id=${env.SHOPIFY_CLIENT_ID}&redirect_uri=${env.SHOPIFY_REDIRECT_URI}`
}

export const getToken = async (storeName: string, authCode: string): Promise<unknown> => {
  const env = getCloudflareContext().env
  const url = `https://${storeName}/${shopifyPath}/access_token?client_id=${env.SHOPIFY_CLIENT_ID}&client_secret=${env.SHOPIFY_CLIENT_SECRET}&code=${authCode}`
  try {
    const response = await fetch(url, { method: 'POST' })

    if (response.status !== 200) {
      return {
        errorPage: (await response.text())
      }
    }

    const json = await response.json()

    console.log(json)

    return json
  } catch (error) {
    console.error(error)
  }
  return { error: 'something went wrong' }
}
