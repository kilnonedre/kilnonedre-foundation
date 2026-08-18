export interface ConfigListRespT<T> {
  items: Array<T>
  pageInfo: {
    page: number
    size: number
    totalElement: number
    totalPage: number
  }
}
