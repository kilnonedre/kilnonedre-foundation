// 审核状态
export const EnumAMapPluginPosition = {
  LT: 'LT',
  RT: 'RT',
  LB: 'LB',
  RB: 'RB',
} as const

export type EnumAMapPluginPosition =
  (typeof EnumAMapPluginPosition)[keyof typeof EnumAMapPluginPosition]

export const EnumAMapPluginPositionLabel: Record<
  EnumAMapPluginPosition,
  string
> = {
  LT: '左上',
  RT: '右上',
  LB: '左下',
  RB: '右下',
}
