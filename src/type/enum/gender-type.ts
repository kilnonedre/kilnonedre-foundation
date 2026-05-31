// 性别
export const EnumGenderType = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  UNKNOWN: 'UNKNOWN',
} as const

export type EnumGenderType =
  (typeof EnumGenderType)[keyof typeof EnumGenderType]

export const EnumGenderTypeLabel: Record<EnumGenderType, string> = {
  MALE: '先生',
  FEMALE: '女士',
  UNKNOWN: '保密',
}
