import { ConfigProp as ConfigNavUserProp } from '@/layout/main/component/nav-user/type'
import { Sidebar } from '@/shadcn/components/sidebar'
import { ConfigNavItem } from '@/type'

export interface ConfigProp extends React.ComponentProps<typeof Sidebar> {
  navMain: Array<ConfigNavItem>
  isSuperAdmin: boolean
  permissionSet: Set<string>
  isLoading: boolean
  navUserProp: ConfigNavUserProp
}
