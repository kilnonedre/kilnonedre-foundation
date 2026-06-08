import { ConfigApiRespT } from '@/type/api'

export interface ConfigFetchWithInterceptor {
  <T = object>(url: string, options?: RequestInit): Promise<ConfigApiRespT<T>>
}
