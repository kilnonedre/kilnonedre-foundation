'use client'

import Link from 'next/link'
import { buildCrumbs } from '@/layout/main/component/site-header/util'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shadcn/components/breadcrumb'
import { Separator } from '@/shadcn/components/separator'
import { SidebarTrigger } from '@/shadcn/components/sidebar'
import type * as types from './type'

export const SiteHeader = (props: types.ConfigProp) => {
  const crumbs = buildCrumbs(props.navItems, props.pathname, props.merchantCode)

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((c, idx) => {
              const isLast = idx === crumbs.length - 1
              return (
                <div key={idx} className="flex items-center gap-1.5 sm:gap-2.5">
                  <BreadcrumbItem key={c.href}>
                    {isLast ? (
                      <BreadcrumbPage>{c.label}</BreadcrumbPage>
                    ) : c.navigable ? (
                      <BreadcrumbLink asChild>
                        <Link href={c.href}>{c.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <span className="text-muted-foreground">{c.label}</span>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </div>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
