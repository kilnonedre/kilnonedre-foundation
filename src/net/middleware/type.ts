import { UUID } from '@/type'
import { ConfigApiRespT } from '@/type/api'

export interface ConfigProp {
  getAccessToken: () => string | null | undefined
  getRefreshToken: () => string | null | undefined
  getUserId: () => UUID | null | undefined
  getMerchantId?: () => string | null | undefined

  setAccessToken: (token: string) => void
  setRefreshToken?: (token: string) => void
  clearAuth: () => void

  refreshAccessToken: (params: {
    refreshToken: string
    userId: UUID
  }) => Promise<
    ConfigApiRespT<{
      accessToken: string
    }>
  >

  onRefreshSuccess?: () => void

  onUnauthorized?: (params: { status: 401; url: string }) => void
  onHttpError?: (params: {
    status: number
    url: string
    method: string
  }) => void
  onApiError?: (params: { url: string; code: string; msg: string }) => void

  operatorType?: string
  successCode?: string
}
