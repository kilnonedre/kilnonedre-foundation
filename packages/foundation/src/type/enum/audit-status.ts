import { enumToOptions } from '@/util'

// 审计状态
export const EnumAuditStatus = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
} as const

export type EnumAuditStatus =
  (typeof EnumAuditStatus)[keyof typeof EnumAuditStatus]

export const EnumAuditStatusLabel: Record<EnumAuditStatus, string> = {
  CREATE: '创建',
  UPDATE: '更新',
  DELETE: '删除',
}

export const enumAuditStatusOptions = enumToOptions(
  EnumAuditStatus,
  EnumAuditStatusLabel
)
