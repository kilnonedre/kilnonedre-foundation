import { EnumOperatorType, UUID } from '@/type'
import { ConfigApiRespT } from '@/type/api'

export interface ConfigProp {
  getAccessToken: () => string | null | undefined
  setAccessToken: (token: string) => void

  getRefreshToken: () => string | null | undefined
  setRefreshToken?: (token: string) => void

  getUserId: () => UUID | null | undefined

  getMerchantId: () => string | null | undefined
  getMerchantCode: () => string | null | undefined
  readMerchant: ConfigReadMerchant
  setMerchant: (id: UUID, code: string) => void

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

  operatorType: EnumOperatorType
  successCode: string | number
}

export interface ConfigReadMerchant {
  (code: string): Promise<
    ConfigApiRespT<{
      id: UUID
      code: string
    }>
  >
}
