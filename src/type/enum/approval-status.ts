import { enumToOptions } from '@/util'

// 审核状态
export const EnumApprovalStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
} as const

export type EnumApprovalStatus =
  (typeof EnumApprovalStatus)[keyof typeof EnumApprovalStatus]

export const EnumApprovalStatusLabel: Record<EnumApprovalStatus, string> = {
  PENDING: '待审核',
  APPROVED: '审核通过',
  REJECTED: '审核拒绝',
  CANCELLED: '撤回',
}

export const enumApprovalStatusOptions = enumToOptions(
  EnumApprovalStatus,
  EnumApprovalStatusLabel
)
