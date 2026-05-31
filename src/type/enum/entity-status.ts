import { enumToOptions } from '@/util'

// 实体状态
export const EnumEntityStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED',
} as const

export type EnumEntityStatus =
  (typeof EnumEntityStatus)[keyof typeof EnumEntityStatus]

export const EnumEntityStatusLabel: Record<EnumEntityStatus, string> = {
  ACTIVE: '正常',
  INACTIVE: '停用',
  DELETED: '已删除',
}

export const enumEntityStatusOptions = enumToOptions(
  EnumEntityStatus,
  EnumEntityStatusLabel
)
