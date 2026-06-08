import { ConfigNavItem } from '@/type'

export interface ConfigProp {
  navItems: Array<ConfigNavItem>
  pathname: string
  merchantCode?: string
}
