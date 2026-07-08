import * as React from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/button'
import {
  ConfigCascaderOption,
  ConfigDropdownCascaderSingleWithOptionsProp,
} from '@/components/dropdown-cascader/type'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shadcn/components/dropdown-menu'
import { EnumVariant } from '@/type'
import { getOptionMap, renderCascaderNodes } from './dropdown-cascader-base'

export const DropdownCascaderSingle = (
  props: ConfigDropdownCascaderSingleWithOptionsProp
) => {
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
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="self-start">
        <Button
          variant={EnumVariant.OUTLINE}
          className="h-auto! min-h-9 w-full justify-between px-3 leading-none"
        >
          <span className="truncate">{selectedPath || props.placeholder}</span>

          <div className="ml-auto flex items-center">
            {props.value && (
              <span
                role="button"
                tabIndex={0}
                className="mr-1 inline-flex cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground"
                onPointerDown={e => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  props.onValueChange?.(null, null)
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    e.stopPropagation()
                    props.onValueChange?.(null, null)
                  }
                }}
              >
                <X className="size-3.5" />
              </span>
            )}

            <ChevronDown className="size-4 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-(--radix-dropdown-menu-trigger-width)"
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
