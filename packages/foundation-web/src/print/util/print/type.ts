import { ConfigPaperSize } from '@/print/type'
import { ConfigElement } from '@/print/type/element'
import { ReactNode } from 'react'

export interface ConfigProp<T> {
  data: T
  paperSize: ConfigPaperSize
  elements: Array<ConfigElement>
}

export interface ConfigRenderProp<T> extends ConfigProp<T> {
  render: () => ReactNode
}

export interface ConfigPrintProp<
  T,
  R extends Record<string, string | number>,
> extends ConfigProp<T> {
  getTable: (value: T) => Array<R>
}
