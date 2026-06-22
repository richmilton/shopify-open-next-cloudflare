const getApiHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'X-Shopify-Access-Token': token
})

const API_VERSION = '2026-04'
const shopifyDomain = 'myshopify.com'

export const callGraphql = async (shopName: string, query: string, token: string, variables?: unknown) => {
  const hostName = shopName.endsWith(shopifyDomain) ? shopName : `${shopName}.${shopifyDomain}`
  const url = `https://${hostName}/admin/api/${API_VERSION}/graphql.json`
  const headers = getApiHeaders(token)
  const body = JSON.stringify({
    query,
    variables: variables || {}
  })

  try {
    const response =  await fetch(url, { method: 'POST', body, headers })

    if (response.status === 200) {
      return await response.json()
    }
  } catch (error) {
    console.error(error)
    return {
      data: { shop: undefined },
      error: error,
    }
  }
}

const api = {
  callGraphql
}

export default api
