export interface ConfigApiRespT<T> {
  code: string
  data: T
  msg: string
}

export interface ConfigApiListRespT<T> {
  code: string
  data: {
    items: Array<T>
  }
  msg: string
}
