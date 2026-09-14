import { LucideIcon } from 'lucide-react'

export interface ConfigNavItem {
  id: string
  title: string
  url: string
  icon?: LucideIcon
  navigable?: boolean
  visibleInSidebar?: boolean
  bypassPermission?: boolean
  items?: Array<ConfigNavItem>
}
