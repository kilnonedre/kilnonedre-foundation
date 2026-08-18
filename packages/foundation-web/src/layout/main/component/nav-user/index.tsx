'use client'

import {
  BellIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/components/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/components/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shadcn/components/sidebar'
import type * as types from './type'

const NavUser = (props: types.ConfigProp) => {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={props.avatarUrl}
                  alt={props.username}
                  className="h-full w-full object-cover"
                />

                <AvatarFallback className="rounded-lg">
                  {props.fallbackText}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-medium">{props.username}</span>

                <span className="truncate text-xs text-muted-foreground">
                  {props.email}
                </span>
              </div>

              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-base">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={props.avatarUrl}
                    alt={props.username}
                    className="h-full w-full object-cover"
                  />

                  <AvatarFallback className="rounded-lg">
                    {props.fallbackText}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-base leading-tight">
                  <span className="truncate font-medium">{props.username}</span>

                  <span className="truncate text-xs text-muted-foreground">
                    {props.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={props.onProfile}>
                <UserCircleIcon />
                账户
              </DropdownMenuItem>

              <DropdownMenuItem onClick={props.onNotification}>
                <BellIcon />
                通知
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={props.onLogout}>
              <LogOutIcon />
              登出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavUser
