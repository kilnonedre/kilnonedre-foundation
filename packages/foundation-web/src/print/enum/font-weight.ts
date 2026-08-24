import { enumToOptions } from '@kilnonedre/foundation'

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
