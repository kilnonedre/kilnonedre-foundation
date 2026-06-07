import { enumToOptions } from '@/util'

// 页面元素类型
export const EnumElementType = {
  TEXT: 'TEXT',
  TABLE: 'TABLE',
} as const

export type EnumElementType =
  (typeof EnumElementType)[keyof typeof EnumElementType]

export const EnumElementTypeLabel: Record<EnumElementType, string> = {
  TEXT: '文本',
  TABLE: '表格',
}

export const enumElementTypeOptions = enumToOptions(
  EnumElementType,
  EnumElementTypeLabel
)

// 页面元素类型
export const EnumFontWeight = {
  NORMAL: 'NORMAL',
  BOLD: 'BOLD',
} as const

export type EnumFontWeight =
  (typeof EnumFontWeight)[keyof typeof EnumFontWeight]

export const EnumFontWeightLabel: Record<EnumFontWeight, string> = {
  NORMAL: '普通',
  BOLD: '加粗',
}

export const enumFontWeightOptions = enumToOptions(
  EnumFontWeight,
  EnumFontWeightLabel
)

// 对齐方式
export const EnumTextAlign = {
  LEFT: 'LEFT',
  CENTER: 'CENTER',
  RIGHT: 'RIGHT',
} as const

export type EnumTextAlign = (typeof EnumTextAlign)[keyof typeof EnumTextAlign]

export const EnumTextAlignLabel: Record<EnumTextAlign, string> = {
  LEFT: '左对齐',
  CENTER: '居中',
  RIGHT: '右对齐',
}

export const enumTextAlignOptions = enumToOptions(
  EnumTextAlign,
  EnumTextAlignLabel
)

export interface ConfigTableColumn {
  title: string
  field: string
  width: number
}

export interface ConfigPrintData {
  orderNo: string
  customerName: string
  deliveryDate: string
  items: Array<Record<string, string | number>>
}

export interface ConfigPrintElement {
  id: string
  type: EnumElementType
  x: number
  y: number
  width: number
  height: number
  props: {
    text?: string
    fontSize?: number
    fontWeight?: string
    textAlign?: string
    color?: string
    field?: string
    columns?: Array<ConfigTableColumn>
    rowHeight?: number
  }
}
