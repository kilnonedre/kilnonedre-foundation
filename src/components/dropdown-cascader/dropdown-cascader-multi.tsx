import { ReactNode, useCallback, useMemo, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/button'
import type {
  ConfigCascaderSelected,
  ConfigDropdownCascaderMultiProp,
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
    return list.filter(item => item !== value)
  }

  return [...list, value]
}

export const DropdownCascaderMulti = <T,>({
  value = [],
  ...props
}: ConfigDropdownCascaderMultiProp<T>) => {
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

  const buildSelected = useCallback(
    (values: Array<string>): Array<ConfigCascaderSelected<T>> => {
      return values.flatMap(item => {
        const selected = optionMap.get(item)
        return selected ? [selected] : []
      })
    },
    [optionMap]
  )

  const selectNode = (node: T) => {
    const nodeValue = props.getValue(node)
    const nextValues = toggle(value, nodeValue)
    const nextSelected = buildSelected(nextValues)

    props.onValueChange?.(nextValues, nextSelected)
  }

  const remove = (removedValue: string) => {
    const nextValues = value.filter(item => item !== removedValue)
    const nextSelected = buildSelected(nextValues)

    props.onValueChange?.(nextValues, nextSelected)
  }

  const selectedItems = buildSelected(value).map(selected => ({
    value: props.getValue(selected.option),
    label: selected.path
      .map(option => props.getLabel(option))
      .reduce<Array<ReactNode>>((result, label, index) => {
        if (index > 0) {
          result.push(' / ')
        }

        result.push(label)
        return result
      }, []),
  }))

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="self-start">
        <Button
          type="button"
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
                  onPointerDown={event => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                  onClick={event => {
                    event.preventDefault()
                    event.stopPropagation()
                    remove(item.value)
                  }}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      event.stopPropagation()
                      remove(item.value)
                    }
                  }}
                >
                  <X className="size-3" />
                </span>
              </span>
            ))}
          </div>

          <ChevronDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-(--radix-dropdown-menu-trigger-width)"
      >
        {renderCascaderNodes(
          props.options,
          [],
          value,
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
