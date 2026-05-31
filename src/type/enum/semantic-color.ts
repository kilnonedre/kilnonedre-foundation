import { enumToOptions } from '@/util'

// 语义颜色（表示颜色含义，而不是展示方式）
export const EnumSemanticColor = {
  PRIMARY: 'PRIMARY',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  DANGER: 'DANGER',
  INFO: 'INFO',
  NEUTRAL: 'NEUTRAL',
  DARK: 'DARK',
} as const

export type EnumSemanticColor =
  (typeof EnumSemanticColor)[keyof typeof EnumSemanticColor]

export const EnumSemanticColorLabel: Record<EnumSemanticColor, string> = {
  PRIMARY: '主色（品牌色）',
  SUCCESS: '成功（绿）',
  WARNING: '警告（黄）',
  DANGER: '危险（红）',
  INFO: '信息（蓝）',
  NEUTRAL: '中性（灰）',
  DARK: '深色（黑）',
}

export const enumSemanticColorOptions = enumToOptions(
  EnumSemanticColor,
  EnumSemanticColorLabel
)
