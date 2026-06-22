import { getCloudflareContext } from '@opennextjs/cloudflare'

export const getFirst = async (sql: string, bindings: unknown[]) => {
  const env = getCloudflareContext().env
  if (env) {
    const ps = env.DB.prepare(sql).bind(...bindings)

    return await ps.first()
  }
}
