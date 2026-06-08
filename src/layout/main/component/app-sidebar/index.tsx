'use client'

import * as React from 'react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { NavMain } from '@/layout/main/component/nav-main'
import NavUser from '@/layout/main/component/nav-user'
import { TeamSwitcher } from '@/layout/main/component/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/shadcn/components/sidebar'
import type * as types from './type'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
}

export const AppSidebar = ({
  navMain,
  isSuperAdmin,
  permissionSet,
  isLoading,
  navUserProp,
  ...sidebarProps
}: types.ConfigProp) => {
  const filteredNavMain = navMain
    .filter(group => group.visibleInSidebar !== false)
    .map(group => {
      if (!group.items?.length) {
        return group
      }

      const children = group.items.filter(item => {
        if (item.visibleInSidebar === false) return false
        if (isSuperAdmin) return true
        if (item.bypassPermission === true) return true
        return permissionSet.has(item.id)
      })

      return {
        ...group,
        items: children,
      }
    })
    .filter(group => {
      if (!group.items) return true
      return group.items.length > 0
    })

  if (isLoading) return null

  return (
    <Sidebar collapsible="icon" {...sidebarProps}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser {...navUserProp} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
