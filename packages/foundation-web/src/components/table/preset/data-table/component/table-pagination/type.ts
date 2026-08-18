export interface ConfigProp {
  totalPage: number
  size: number
  sizeList: Array<number>
  currentPage: number
  onUpdateCurrentPage: (_page: number) => void
  onUpdateSize: (_size: number) => void
}

export type PageItem =
  | { type: 'page'; page: number }
  | { type: 'ellipsis'; key: string }
