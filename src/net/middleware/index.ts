// import { eventBus } from '@/shared/event-bus'
// import { ConfigApiRespT } from '@/type/api'

// let refreshPromise: Promise<string> | null = null

// const getOrCreateRefreshPromise = (
//   refreshTokenFn: () => Promise<string>
// ): Promise<string> => {
//   if (!refreshPromise) {
//     refreshPromise = (async () => {
//       const auth = useAuthStore.getState()
//       const rtk = auth.refreshToken
//       const userId = auth.id
//       if (!rtk || !userId) throw new Error('NO_REFRESH_TOKEN')

//       const res = await RefreshAccessToken({
//         refreshToken: rtk,
//         userId,
//       })

//       if (res.code !== '200' || !res.data?.accessToken) {
//         throw new Error('REFRESH_FAILED_' + (res.msg || 'UNKNOWN'))
//       }

//       auth.setAccessToken(res.data.accessToken)

//       // 如果后端有 refreshToken 轮转，就打开这一段
//       // if (res.data.refreshToken) {
//       //   auth.setRefreshToken(res.data.refreshToken)
//       // }

//       return res.data.accessToken
//     })().finally(() => {
//       refreshPromise = null
//     })
//   }

//   return refreshPromise
// }

// const clearAuthAndNotify = (
//   url: string,
//   onUnauthorized?: (_url: string) => void
// ) => {
//   onUnauthorized?.(url)
//   eventBus.emit('HTTP:UNAUTH', {
//     status: 401,
//     url,
//   })
// }

// const withAuthHeader = (
//   options: RequestInit = {},
//   extraHeaders?: Record<string, string>
// ): RequestInit => {
//   const headers = new Headers(options.headers || {})

//   Object.entries(extraHeaders ?? {}).forEach(([key, value]) => {
//     headers.set(key, value)
//   })

//   return {
//     ...options,
//     headers,
//   }
// }

// export const fetchWithInterceptor = async <T = object>(
//   url: string,
//   options: RequestInit = {},
//   onUnauthorized?: (_url: string) => void
// ): Promise<ConfigApiRespT<T>> => {
//   const request = () => fetch(url, withAuthHeader(options))

//   let response = await request()

//   if (response.status === 401) {
//     try {
//       await getOrCreateRefreshPromise()
//     } catch (e) {
//       clearAuthAndNotify(url, onUnauthorized)
//       throw e
//     }

//     response = await request()

//     if (response.status === 401) {
//       clearAuthAndNotify(url, onUnauthorized)
//       throw new Error('UNAUTHORIZED')
//     }
//   }

//   if (!response.ok) {
//     eventBus.emit('HTTP:ERR', {
//       status: response.status,
//       url,
//       method: options.method || 'GET',
//     })
//   }

//   const json = (await response.json()) as ConfigApiRespT<T>

//   if (json.code !== '200') {
//     eventBus.emit('API:ERR', {
//       url,
//       code: json.code,
//       msg: json.msg,
//     })
//   }

//   return json
// }
