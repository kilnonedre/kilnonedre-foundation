import { ConfigNavItem } from '@/type/config'

export interface ConfigProp {
  navItems: Array<ConfigNavItem>
  pathname: string
  merchantCode?: string
}
