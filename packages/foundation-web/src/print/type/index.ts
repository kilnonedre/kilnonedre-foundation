import { EnumPaperType } from '@/print/enum'
import { ConfigElement, ConfigField } from '@/print/type/element'

export * from './element'

export interface ConfigPaperSize {
  width: number
  height: number
}

export interface ConfigTemplate {
  paper: {
    type: EnumPaperType
    size: ConfigPaperSize
  }
  elements: Array<ConfigElement>
}

export interface ConfigProp<T, R extends Record<string, string | number>> {
  template?: ConfigTemplate
  printData: T
  className?: string
  getTable: (value: T) => Array<R>
  fields: Array<ConfigField>
  columns: Array<ConfigField>
  onConfirm: (_v: ConfigTemplate) => void
}
