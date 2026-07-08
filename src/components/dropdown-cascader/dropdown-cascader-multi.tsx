import * as React from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/button'
import {
  ConfigCascaderOption,
  ConfigDropdownCascaderMultiWithOptionsProp,
} from '@/components/dropdown-cascader/type'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shadcn/components/dropdown-menu'
import { EnumVariant } from '@/type'
import { getOptionMap, renderCascaderNodes } from './dropdown-cascader-base'

const toggle = (list: Array<string>, value: string) => {
  if (list.includes(value)) {
    return list.filter(v => v !== value)
  }
  return [...list, value]
}

export const DropdownCascaderMulti = ({
  value = [],
  ...props
}: ConfigDropdownCascaderMultiWithOptionsProp) => {
  const optionMap = React.useMemo(
    () => getOptionMap(props.options),
    [props.options]
  )
  const [open, setOpen] = React.useState(false)

  const buildSelected = React.useCallback(
    (values: Array<string>) => {
      return values
        .map(v => optionMap.get(v))
        .filter(Boolean)
        .map(i => ({
          option: i!.option,
          path: i!.path,
        }))
    },
    [optionMap]
  )

  const selectNode = (node: ConfigCascaderOption) => {
    const nextValues = toggle(value, node.value)
    const nextSelected = buildSelected(nextValues)
    props.onValueChange?.(nextValues, nextSelected)
  }

  const remove = (v: string) => {
    const nextValues = value.filter(i => i !== v)
    const nextSelected = buildSelected(nextValues)
    props.onValueChange?.(nextValues, nextSelected)
  }

  const selectedItems = value
    .map(v => optionMap.get(v))
    .filter(Boolean)
    .map(i => ({
      value: i!.option.value,
      label: i!.path.map(p => p.label).join(' / '),
    }))

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="self-start">
        <Button
          variant={EnumVariant.OUTLINE}
          className="h-auto! min-h-9 w-full justify-between px-3"
        >
          <div className="flex flex-wrap gap-1">
            {selectedItems.length === 0 && props.placeholder}

            {selectedItems.map(item => (
              <span
                key={item.value}
                className="inline-flex items-center gap-1 rounded border px-2 py-0.5 text-sm"
              >
                {item.label}
                <span
                  role="button"
                  tabIndex={0}
                  className="inline-flex cursor-pointer items-center justify-center"
                  onPointerDown={e => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    remove(item.value)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      remove(item.value)
                    }
                  }}
                >
                  <X className="size-3" />
                </span>
              </span>
            ))}
          </div>

          <ChevronDown className="size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-(--radix-dropdown-menu-trigger-width)"
      >
        {renderCascaderNodes(props.options, [], value, selectNode)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
