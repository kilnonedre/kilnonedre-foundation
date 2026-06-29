import { CommonAccount, EnumAuditStatus } from '@/type'
import { UUID } from '@/type/uuid'

export interface ConfigAuditDiffResp {
  id: UUID // 审计记录的唯一标识
  action: EnumAuditStatus // 审计操作类型
  operator: CommonAccount | null // 操作人
  operatedAt: Date | null // 操作时间
  updatedReason: string | null // 更新原因
  changes: Array<ConfigAuditFieldChangeResp> // 字段变更明细
}

export interface ConfigAuditFieldChangeResp {
  field: string // 字段名
  label: string // 字段显示名称
  oldText: string | null // 修改前的显示值
  newText: string | null // 修改后的显示值
}
