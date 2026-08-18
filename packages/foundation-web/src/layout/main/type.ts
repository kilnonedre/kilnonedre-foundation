import type { ReactNode } from 'react'
import { ConfigProp as ConfigAppSideBarProp } from '@/layout/main/component/app-sidebar/type'
import { ConfigProp as ConfigSiteHeaderProp } from '@/layout/main/component/site-header/type'

export interface ConfigProp {
  children: ReactNode
  appSideBarProp: ConfigAppSideBarProp
  siteHeader: ConfigSiteHeaderProp
}
