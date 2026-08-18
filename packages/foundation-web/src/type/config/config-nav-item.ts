import { UUID } from '@kilnonedre/foundation'
import { LucideIcon } from 'lucide-react'

export interface ConfigNavItem {
  id: UUID
  title: string
  url: string
  icon?: LucideIcon
  navigable?: boolean
  visibleInSidebar?: boolean
  bypassPermission?: boolean
  items?: Array<ConfigNavItem>
}
