import { enumToOptions } from '@kilnonedre/foundation'

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
