import { ConfigAuditDiffResp } from '@kilnonedre/foundation'

export interface ConfigProp {
  diffs: Array<ConfigAuditDiffResp>
  open: boolean
  onOpenChange: (_nextOpen: boolean) => void
}
