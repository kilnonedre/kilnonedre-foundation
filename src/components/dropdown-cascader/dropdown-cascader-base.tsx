import { Check } from 'lucide-react'
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/shadcn/components/dropdown-menu'
import { ConfigCascaderOption } from './type'

export const getOptionMap = (options: Array<ConfigCascaderOption>) => {
  const map = new Map<
    string,
    { option: ConfigCascaderOption; path: Array<ConfigCascaderOption> }
  >()

  const walk = (
    nodes: Array<ConfigCascaderOption>,
    parent: Array<ConfigCascaderOption>
  ) => {
    for (const node of nodes) {
      const path = [...parent, node]

      map.set(node.value, {
        option: node,
        path,
      })

      if (node.children?.length) {
        walk(node.children, path)
      }
    }
  }

  walk(options, [])
  return map
}

export const renderCascaderNodes = (
  nodes: Array<ConfigCascaderOption>,
  parentPath: Array<ConfigCascaderOption>,
  selectedValues: string[],
  onSelect: (_node: ConfigCascaderOption) => void
): React.ReactNode => {
  return nodes.map(node => {
    const path = [...parentPath, node]
    const isBranch = !!node.children?.length
    const isSelected = selectedValues.includes(node.value)

    if (isBranch) {
      return (
        <DropdownMenuSub key={node.value}>
          <DropdownMenuSubTrigger disabled={node.disabled}>
            {node.label}
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent className="min-w-56">
              <DropdownMenuItem
                disabled={node.disabled}
                onSelect={e => {
                  e.preventDefault()
                  onSelect(node)
                }}
                className="flex items-center justify-between"
              >
                <span>{node.label}</span>
                {isSelected && <Check className="size-4" />}
              </DropdownMenuItem>

              {renderCascaderNodes(
                node.children!,
                path,
                selectedValues,
                onSelect
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      )
    }

    return (
      <DropdownMenuItem
        key={node.value}
        disabled={node.disabled}
        onSelect={e => {
          e.preventDefault()
          onSelect(node)
        }}
        className="flex items-center justify-between"
      >
        <span>{node.label}</span>
        {isSelected && <Check className="size-4" />}
      </DropdownMenuItem>
    )
  })
}
