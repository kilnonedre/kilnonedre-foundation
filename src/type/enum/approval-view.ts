import { enumToOptions } from '@/util'

// 审批视图
export const EnumApprovalView = {
  ALL: 'ALL', // 全部
  SUBMITTED_BY_ME: 'SUBMITTED_BY_ME', // 我提交的
  ASSIGNED_TO_ME: 'ASSIGNED_TO_ME', // 分配给我审批的
} as const

export type EnumApprovalView =
  (typeof EnumApprovalView)[keyof typeof EnumApprovalView]

export const EnumApprovalViewLabel: Record<EnumApprovalView, string> = {
  ALL: '全部',
  SUBMITTED_BY_ME: '我提交的',
  ASSIGNED_TO_ME: '我审批的',
}

export const enumApprovalViewOptions = enumToOptions(
  EnumApprovalView,
  EnumApprovalViewLabel
)
