'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import {
  ConfigCascaderOption,
  ConfigDropdownCascaderSingleProp,
} from '@/components/dropdown-cascader/type'
import { Button } from '@/shadcn/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shadcn/components/dropdown-menu'
import { getOptionMap, renderCascaderNodes } from './dropdown-cascader-base'

export const DropdownCascader = (props: ConfigDropdownCascaderSingleProp) => {
  const optionMap = React.useMemo(
    () => getOptionMap(props.options),
    [props.options]
  )
  const [open, setOpen] = React.useState(false)

  const selectNode = (node: ConfigCascaderOption) => {
    const found = optionMap.get(node.value)
    if (!found) return

    props.onValueChange?.(node.value, found)
    setOpen(false)
  }

  const selectedPath = props.value
    ? optionMap
        .get(props.value)
        ?.path.map(i => i.label)
        .join(' / ')
    : ''

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="self-start">
        <Button
          variant="outline"
          className="h-auto! min-h-9 w-full justify-between px-3 leading-none"
        >
          {selectedPath || props.placeholder}
          <ChevronDown className="size-4 ml-auto opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
      >
        {renderCascaderNodes(
          props.options,
          [],
          props.value ? [props.value] : [],
          selectNode
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
