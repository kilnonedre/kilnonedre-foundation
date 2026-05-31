// 展示风格（控制颜色如何展示）
export const EnumVariant = {
  SOLID: 'SOLID', // 实心：背景色 + 白字
  OUTLINE: 'OUTLINE', // 描边：边框 + 主色文字
  SOFT: 'SOFT', // 柔和：浅背景 + 深色文字
} as const

export type EnumVariant = (typeof EnumVariant)[keyof typeof EnumVariant]

export const EnumVariantLabel: Record<EnumVariant, string> = {
  SOLID: '实心',
  OUTLINE: '描边',
  SOFT: '柔和',
}
