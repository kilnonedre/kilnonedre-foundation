import { ConfigAuditDiffResp } from '@/type'

export interface ConfigProp {
  diffs: Array<ConfigAuditDiffResp>
  open: boolean
  onOpenChange: (_nextOpen: boolean) => void
}
