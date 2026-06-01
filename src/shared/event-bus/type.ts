export type Events = {
  'HTTP:ERR': ConfigHttpErr
  'HTTP:UNAUTH': ConfigHttpUnauth
  'API:ERR': ConfigApiErr
}

export interface ConfigHttpErr {
  status: number
  url: string
  method: string
}

export interface ConfigHttpUnauth {
  status: 401
  url: string
}

export interface ConfigApiErr {
  code: string
  msg: string
  url: string
}

export type Listener<T> = (_payload: T) => void

export type AnyFn = (..._args: unknown[]) => unknown
