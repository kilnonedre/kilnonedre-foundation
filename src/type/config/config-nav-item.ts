import { LucideIcon } from 'lucide-react'
import { UUID } from '@/type/uuid'

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
