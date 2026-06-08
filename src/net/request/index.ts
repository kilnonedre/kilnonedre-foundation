import type * as types from './type'

const isFormData = (value: unknown): value is FormData => {
  return typeof FormData !== 'undefined' && value instanceof FormData
}

export const createHttp = (
  fetchWithInterceptor: types.ConfigFetchWithInterceptor
) => {
  const Get = (url: string, params?: object, config?: RequestInit) => {
    let suffix = ''

    if (params) {
      const query = Object.entries(params)
        .filter(
          ([_, value]) => value !== undefined && value !== null && value !== ''
        )
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&')

      if (query) {
        suffix = `?${query}`
      }
    }

    return fetchWithInterceptor(`${url}${suffix}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    })
  }

  const Post = (url: string, params?: object, config?: RequestInit) => {
    const isFd = isFormData(params)
    const body = (isFd ? params : JSON.stringify(params)) as FormData | string

    return fetchWithInterceptor(url, {
      method: 'POST',
      ...(isFd
        ? {}
        : {
            headers: {
              'Content-Type': 'application/json',
            },
          }),
      body,
      ...config,
    })
  }

  const Put = (url: string, params?: object, config?: RequestInit) => {
    const body = (isFormData(params) ? params : JSON.stringify(params)) as
      | FormData
      | string

    return fetchWithInterceptor(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      ...config,
    })
  }

  const Patch = (url: string, params?: object, config?: RequestInit) => {
    const body = (isFormData(params) ? params : JSON.stringify(params)) as
      | FormData
      | string

    return fetchWithInterceptor(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      ...config,
    })
  }

  const Delete = (url: string, params?: object, config?: RequestInit) => {
    return fetchWithInterceptor(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      ...config,
    })
  }

  return {
    Get,
    Post,
    Put,
    Patch,
    Delete,
  }
}
