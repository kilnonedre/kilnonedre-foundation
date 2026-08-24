import { enumToOptions } from '@kilnonedre/foundation'

// 页面元素类型
export const EnumElementType = {
  TEXT: 'TEXT',
  FIELD: 'FIELD',
  TABLE: 'TABLE',
} as const

export type EnumElementType =
  (typeof EnumElementType)[keyof typeof EnumElementType]

export const EnumElementTypeLabel: Record<EnumElementType, string> = {
  TEXT: '文本',
  FIELD: '字段',
  TABLE: '表格',
}

export const enumElementTypeOptions = enumToOptions(
  EnumElementType,
  EnumElementTypeLabel
)
