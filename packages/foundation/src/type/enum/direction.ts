import { enumToOptions } from '@/util'

// 布局方向
export const EnumDirection = {
  VERTICAL: 'VERTICAL',
  HORIZONTAL: 'HORIZONTAL',
} as const

export type EnumDirection = (typeof EnumDirection)[keyof typeof EnumDirection]

export const EnumDirectionLabel: Record<EnumDirection, string> = {
  VERTICAL: '垂直',
  HORIZONTAL: '水平',
}

export const enumDirectionOptions = enumToOptions(
  EnumDirection,
  EnumDirectionLabel
)
