import { ConfigApiRespT } from '@/type/api'
import type * as types from './type'

export const createFetchWithInterceptor = (props: types.ConfigProp) => {
  let refreshPromise: Promise<string> | null = null

  const successCode = props.successCode ?? '200'
  const operatorType = props.operatorType ?? 'SELLER'

  const getOrCreateRefreshPromise = (): Promise<string> => {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        const refreshToken = props.getRefreshToken()
        const userId = props.getUserId()

        if (!refreshToken || !userId) {
          throw new Error('NO_REFRESH_TOKEN')
        }

        const res = await props.refreshAccessToken({
          refreshToken,
          userId,
        })

        if (res.code !== successCode || !res.data?.accessToken) {
          throw new Error('REFRESH_FAILED_' + (res.msg || 'UNKNOWN'))
        }

        props.setAccessToken(res.data.accessToken)

        // if (res.data.refreshToken && props.setRefreshToken) {
        //   props.setRefreshToken(res.data.refreshToken)
        // }

        // props.onRefreshSuccess?.()

        return res.data.accessToken
      })().finally(() => {
        refreshPromise = null
      })
    }

    return refreshPromise
  }

  const clearAuthAndNotify = (url: string) => {
    props.clearAuth()
    props.onUnauthorized?.({ status: 401, url })
  }

  const withAuthHeader = (options: RequestInit = {}): RequestInit => {
    const headers = new Headers(options.headers || {})

    const accessToken = props.getAccessToken()
    const merchantId = props.getMerchantId?.()

    headers.set('X-Operator-Type', operatorType)

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    if (merchantId) {
      headers.set('X-Merchant-Id', merchantId)
    }

    return {
      ...options,
      headers,
    }
  }

  return async function fetchWithInterceptor<T = object>(
    url: string,
    options: RequestInit = {}
  ): Promise<ConfigApiRespT<T>> {
    const request = () => fetch(url, withAuthHeader(options))

    let response = await request()

    if (response.status === 401) {
      try {
        await getOrCreateRefreshPromise()
      } catch (e) {
        clearAuthAndNotify(url)
        throw e
      }

      response = await request()

      if (response.status === 401) {
        clearAuthAndNotify(url)
        throw new Error('UNAUTHORIZED')
      }
    }

    if (!response.ok) {
      props.onHttpError?.({
        status: response.status,
        url,
        method: options.method || 'GET',
      })
    }

    const json = (await response.json()) as ConfigApiRespT<T>

    if (json.code !== successCode) {
      props.onApiError?.({
        url,
        code: json.code,
        msg: json.msg,
      })
    }

    return json
  }
}
