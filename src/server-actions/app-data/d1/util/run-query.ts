import { getCloudflareContext } from '@opennextjs/cloudflare'

export const runQuery = async (sql: string, bindings: unknown[]) => {
  const env = getCloudflareContext().env
  if (env) {
    const ps = env.DB.prepare(sql).bind(...bindings)

    return await ps.run()
  }
}
