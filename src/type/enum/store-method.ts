// 存储方式
export const EnumStorageMethod = {
  COLD: 'COLD',
  FROZEN: 'FROZEN',
  NORMAL: 'NORMAL',
} as const

export type EnumStorageMethod =
  (typeof EnumStorageMethod)[keyof typeof EnumStorageMethod]

export const EnumStorageMethodLabel: Record<EnumStorageMethod, string> = {
  COLD: '冷藏',
  FROZEN: '冷冻',
  NORMAL: '常温',
}
