import { ConfigApiRespT } from '@/type/api'

export interface ConfigFetchWithInterceptor {
  <T = object>(
    url: string,
    options?: RequestInit & { withHeader?: boolean }
  ): Promise<ConfigApiRespT<T>>
}
