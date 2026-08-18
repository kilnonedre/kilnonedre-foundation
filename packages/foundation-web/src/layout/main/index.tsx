import { AppSidebar } from '@/layout/main/component/app-sidebar'
import { SiteHeader } from '@/layout/main/component/site-header'
import { SidebarInset, SidebarProvider } from '@/shadcn/components/sidebar'
import type * as types from './type'

export const MainLayout = (props: types.ConfigProp) => {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" {...props.appSideBarProp} />

      <SidebarInset className="h-screen overflow-hidden md:peer-data-[variant=inset]:h-[calc(100vh-1rem)]">
        <SiteHeader {...props.siteHeader} />
        <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
          <div className="@container/main flex flex-1 min-h-0 flex-col gap-2 overflow-hidden">
            {props.children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
