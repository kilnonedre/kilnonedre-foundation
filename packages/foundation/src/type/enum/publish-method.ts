import { enumToOptions } from '@/util'

// 上架方式
export const EnumPublishMethod = {
  IMMEDIATE: 'IMMEDIATE',
  SCHEDULED: 'SCHEDULED',
  WAREHOUSE: 'WAREHOUSE',
} as const

export type EnumPublishMethod =
  (typeof EnumPublishMethod)[keyof typeof EnumPublishMethod]

export const EnumPublishMethodLabel: Record<EnumPublishMethod, string> = {
  IMMEDIATE: '立刻上架',
  SCHEDULED: '定时上架',
  WAREHOUSE: '入库',
}

export const enumPublishMethodOptions = enumToOptions(
  EnumPublishMethod,
  EnumPublishMethodLabel
)
