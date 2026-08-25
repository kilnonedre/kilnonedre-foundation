import { ReactNode, useMemo, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/button'
import type { ConfigDropdownCascaderSingleProp } from '@/components/dropdown-cascader/type'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shadcn/components/dropdown-menu'
import { getOptionMap, renderCascaderNodes } from './dropdown-cascader-base'
import { EnumVariant } from '@kilnonedre/foundation'

export const DropdownCascaderSingle = <T,>(
  props: ConfigDropdownCascaderSingleProp<T>
) => {
  const [open, setOpen] = useState(false)

  const optionMap = useMemo(
    () =>
      getOptionMap(props.options, {
        getValue: props.getValue,
        getLabel: props.getLabel,
        getChildren: props.getChildren,
        getDisabled: props.getDisabled,
        getShowParentInChildren: props.getShowParentInChildren,
      }),
    [
      props.options,
      props.getValue,
      props.getLabel,
      props.getChildren,
      props.getDisabled,
      props.getShowParentInChildren,
    ]
  )

  const selectNode = (node: T) => {
    const nodeValue = props.getValue(node)
    const found = optionMap.get(nodeValue)

    if (!found) {
      return
    }

    props.onValueChange?.(nodeValue, found)
    setOpen(false)
  }

  const selected = props.value ? optionMap.get(props.value) : undefined

  const selectedPath = selected
    ? selected.path.reduce<Array<ReactNode>>((result, option, index) => {
        if (index > 0) {
          result.push(' / ')
        }

        result.push(props.getLabel(option))
        return result
      }, [])
    : null

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="self-start">
        <Button
          type="button"
          variant={EnumVariant.OUTLINE}
          className="h-auto! min-h-9 w-full justify-between px-3 leading-none"
        >
          <span className="truncate">{selectedPath ?? props.placeholder}</span>

          <div className="ml-auto flex items-center">
            {props.value && (
              <span
                role="button"
                tabIndex={0}
                className="mr-1 inline-flex cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground"
                onPointerDown={event => {
                  event.preventDefault()
                  event.stopPropagation()
                }}
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  props.onValueChange?.(null, null)
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    event.stopPropagation()
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
          selectNode,
          {
            getValue: props.getValue,
            getLabel: props.getLabel,
            getChildren: props.getChildren,
            getDisabled: props.getDisabled,
            getShowParentInChildren: props.getShowParentInChildren,
          },
          props.renderDropdownItem
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
