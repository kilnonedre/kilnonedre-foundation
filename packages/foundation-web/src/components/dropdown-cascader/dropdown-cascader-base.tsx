/* eslint complexity: ["error", 20] */
import { ReactNode } from 'react'
import { Check } from 'lucide-react'
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/shadcn/components/dropdown-menu'
import type {
  ConfigCascaderAccessor,
  ConfigCascaderDropdownItemRenderProp,
  ConfigCascaderSelected,
} from './type'

export const getOptionMap = <T,>(
  options: Array<T>,
  accessor: ConfigCascaderAccessor<T>
) => {
  const map = new Map<string, ConfigCascaderSelected<T>>()

  const walk = (nodes: Array<T>, parentPath: Array<T>) => {
    for (const node of nodes) {
      const path = [...parentPath, node]
      const value = accessor.getValue(node)

      map.set(value, {
        option: node,
        path,
      })

      const children = accessor.getChildren?.(node)

      if (children?.length) {
        walk(children, path)
      }
    }
  }

  walk(options, [])

  return map
}

export const renderCascaderNodes = <T,>(
  nodes: Array<T>,
  parentPath: Array<T>,
  selectedValues: Array<string>,
  onSelect: (_node: T) => void,
  accessor: ConfigCascaderAccessor<T>,
  renderDropdownItem?: (
    props: ConfigCascaderDropdownItemRenderProp<T>
  ) => ReactNode,
  depth = 0
): ReactNode => {
  return nodes.map(node => {
    const value = accessor.getValue(node)
    const label = accessor.getLabel(node)
    const children = accessor.getChildren?.(node)
    const disabled = accessor.getDisabled?.(node) ?? false
    const showParentInChildren =
      accessor.getShowParentInChildren?.(node) ?? true

    const path = [...parentPath, node]
    const hasChildren = Boolean(children?.length)
    const isSelected = selectedValues.includes(value)

    const content = renderDropdownItem ? (
      renderDropdownItem({
        option: node,
        selected: isSelected,
        depth,
        hasChildren,
      })
    ) : (
      <span>{label}</span>
    )

    if (hasChildren) {
      return (
        <DropdownMenuSub key={value}>
          <DropdownMenuSubTrigger disabled={disabled}>
            {label}
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent className="min-w-56">
              {showParentInChildren && (
                <DropdownMenuItem
                  disabled={disabled}
                  onSelect={event => {
                    event.preventDefault()
                    onSelect(node)
                  }}
                  className="flex items-center justify-between"
                >
                  {content}

                  {isSelected && <Check className="size-4 shrink-0" />}
                </DropdownMenuItem>
              )}

              {renderCascaderNodes(
                children!,
                path,
                selectedValues,
                onSelect,
                accessor,
                renderDropdownItem,
                depth + 1
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      )
    }

    return (
      <DropdownMenuItem
        key={value}
        disabled={disabled}
        onSelect={event => {
          event.preventDefault()
          onSelect(node)
        }}
        className="flex items-center justify-between"
      >
        {content}

        {isSelected && <Check className="size-4 shrink-0" />}
      </DropdownMenuItem>
    )
  })
}
