import { EnumElementType } from '@/print/enum/element-type'
import { EnumType } from '@/print/enum/type'
import { UUID } from '@kilnonedre/foundation'

export interface ConfigField {
  name: string
  field: string
  type: EnumType
  width?: number
}

export interface ConfigCreateElementBase {
  type: EnumElementType
  x?: number
  y?: number
}

export interface ConfigCreateTextElement extends ConfigCreateElementBase {
  type: typeof EnumElementType.TEXT
}

export interface ConfigCreateFieldElement extends ConfigCreateElementBase {
  type: typeof EnumElementType.FIELD
  field: ConfigField
}

export interface ConfigCreateTableElement extends ConfigCreateElementBase {
  type: typeof EnumElementType.TABLE
  columns: Array<ConfigField>
}

export type ConfigCreateElement =
  | ConfigCreateTextElement
  | ConfigCreateFieldElement
  | ConfigCreateTableElement

export interface ConfigElementBase {
  id: UUID
  type: EnumElementType
  x: number
  y: number
  width: number
  height: number
}

export interface ConfigTextElement extends ConfigElementBase {
  type: typeof EnumElementType.TEXT
  props: {
    text: string
    fontSize?: number
    fontWeight?: string
    textAlign?: string
    color?: string
  }
}

export interface ConfigFieldElement extends ConfigElementBase {
  type: typeof EnumElementType.FIELD
  props: {
    field: ConfigField
    fontSize?: number
    fontWeight?: string
    textAlign?: string
    color?: string
  }
}

export interface ConfigTableElement extends ConfigElementBase {
  type: typeof EnumElementType.TABLE
  props: {
    columns: Array<ConfigField>
    rowHeight?: number
    fontSize?: number
    color?: string
  }
}

export type ConfigElement =
  | ConfigTextElement
  | ConfigFieldElement
  | ConfigTableElement
