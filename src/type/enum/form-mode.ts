// 表单编辑模式
export const EnumFormMode = {
  VIEW: 'VIEW',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
} as const

export type EnumFormMode = (typeof EnumFormMode)[keyof typeof EnumFormMode]

export const EnumFormModeLabel: Record<EnumFormMode, string> = {
  VIEW: '查看',
  CREATE: '创建',
  UPDATE: '更新',
  DELETE: '删除',
}
