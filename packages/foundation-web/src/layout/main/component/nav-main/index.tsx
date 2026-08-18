'use client'

import { ChevronRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shadcn/components/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shadcn/components/sidebar'
import type * as types from './type'

export const NavMain = (props: types.ConfigProp) => {
  const params = useParams()
  const merchantCode = params.merchant as string | undefined

  const router = useRouter()

  const toPage = (path: string) => {
    router.push(path)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>功能</SidebarGroupLabel>
      <SidebarMenu>
        {props.items.map(item => {
          const parentUrl = item.url

          const hasChildren = !!item.items?.length

          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => toPage(`/${merchantCode ?? ''}${parentUrl}`)}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.navigable}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map(subItem => {
                      const subItemUrl = subItem.url.startsWith('/')
                        ? subItem.url
                        : `${parentUrl}/${subItem.url}`.replace(/\/+/g, '/')

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            onClick={() =>
                              toPage(`/${merchantCode ?? ''}${subItemUrl}`)
                            }
                          >
                            <span className="cursor-default">
                              {subItem.title}
                            </span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
