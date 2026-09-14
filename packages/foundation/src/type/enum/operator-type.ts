// 审核状态
export const EnumOperatorType = {
  ADMIN: 'ADMIN',
  SELLER: 'SELLER',
  CONSUMER: 'CONSUMER',
} as const

export type EnumOperatorType =
  (typeof EnumOperatorType)[keyof typeof EnumOperatorType]

export const EnumOperatorTypeLabel: Record<EnumOperatorType, string> = {
  ADMIN: '管理员',
  SELLER: '商户',
  CONSUMER: '用户',
}
