// import { fetchWithInterceptor } from '../middleware'
// import { getToken, isFormData } from './utils'

// export const Get = (url: string, params?: object, config?: object) => {
//   let suffix = ''
//   if (params) {
//     const query = Object.entries(params)
//       .filter(
//         ([_, value]) => value !== undefined && value !== null && value !== ''
//       )
//       .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
//       .join('&')

//     if (query) {
//       suffix = `?${query}`
//     }
//   }

//   return fetchWithInterceptor(`${url}${suffix}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     ...getToken(),
//     ...config,
//   })
// }

// export const Post = (url: string, params?: object, config?: object) => {
//   const isFd = isFormData(params)
//   const body = (isFd ? params : JSON.stringify(params)) as FormData | string
//   return fetchWithInterceptor(url, {
//     method: 'POST',
//     ...(isFd
//       ? {}
//       : {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }),
//     body,
//     ...getToken(),
//     ...config,
//   })
// }

// export const Put = (url: string, params?: object, config?: object) => {
//   const body = (isFormData(params) ? params : JSON.stringify(params)) as
//     | FormData
//     | string
//   return fetchWithInterceptor(url, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body,
//     ...getToken(),
//     ...config,
//   })
// }

// export const Patch = (url: string, params?: object, config?: object) => {
//   const body = (isFormData(params) ? params : JSON.stringify(params)) as
//     | FormData
//     | string
//   return fetchWithInterceptor(url, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body,
//     ...getToken(),
//     ...config,
//   })
// }

// export const Delete = (url: string, params?: object, config?: object) => {
//   return fetchWithInterceptor(url, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(params),
//     ...getToken(),
//     ...config,
//   })
// }
