'use client'

import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cva } from 'class-variance-authority'
import { ChevronRight } from 'lucide-react'
import { cn } from '@kilnonedre/foundation'

const treeVariants = cva(
  [
    'group relative isolate',
    'px-2',
    'before:absolute',
    'before:inset-x-0',
    'before:top-1/2',
    'before:h-8',
    'before:-translate-y-1/2',
    'before:rounded-lg',
    'before:bg-accent/70',
    'before:opacity-0',
    'before:transition-colors',
    'before:transition-opacity',
    'before:-z-10',
    'hover:before:opacity-100',
  ].join(' ')
)

const selectedTreeVariants = cva(
  'before:opacity-100 before:bg-accent/70 text-accent-foreground'
)

const dragOverVariants = cva(
  'before:opacity-100 before:bg-primary/20 text-primary-foreground'
)

export interface TreeDataItem<T> {
  data: T
  icon?: React.ComponentType<{ className?: string }>
  selectedIcon?: React.ComponentType<{ className?: string }>
  openIcon?: React.ComponentType<{ className?: string }>
  children?: TreeDataItem<T>[]
  actions?: React.ReactNode
  onClick?: () => void
  draggable?: boolean
  droppable?: boolean
  disabled?: boolean
  className?: string
}

type TreeRenderItemParams<T> = {
  item: TreeDataItem<T>
  level: number
  isLeaf: boolean
  isSelected: boolean
  isOpen?: boolean
  hasChildren: boolean
}

type TreeProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeDataItem<T>[] | TreeDataItem<T>
  getId: (_data: T) => string
  // TODO: why
  getName: (_data: T) => React.ReactNode
  initialSelectedItemId?: string
  onSelectChange?: (_item: TreeDataItem<T> | undefined) => void
  expandAll?: boolean
  defaultNodeIcon?: React.ComponentType<{ className?: string }>
  defaultLeafIcon?: React.ComponentType<{ className?: string }>
  onDocumentDrag?: (
    _sourceItem: TreeDataItem<T>,
    _targetItem?: TreeDataItem<T>
  ) => void
  renderItem?: (_params: TreeRenderItemParams<T>) => React.ReactNode
}

function TreeViewInner<T>(
  {
    data,
    initialSelectedItemId,
    onSelectChange,
    expandAll,
    defaultLeafIcon,
    defaultNodeIcon,
    className,
    onDocumentDrag,
    renderItem,
    getId,
    getName,
    ...props
  }: TreeProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [selectedItemId, setSelectedItemId] = React.useState<
    string | undefined
  >(initialSelectedItemId)

  const [draggedItem, setDraggedItem] = React.useState<TreeDataItem<T> | null>(
    null
  )

  const handleSelectChange = React.useCallback(
    (item: TreeDataItem<T> | undefined) => {
      setSelectedItemId(item ? getId(item.data) : undefined)
      if (onSelectChange) {
        onSelectChange(item)
      }
    },
    [onSelectChange]
  )

  const handleDragStart = React.useCallback((item: TreeDataItem<T>) => {
    setDraggedItem(item)
  }, [])

  const handleDrop = React.useCallback(
    (targetItem?: TreeDataItem<T>) => {
      if (!draggedItem || !onDocumentDrag) {
        return
      }

      if (targetItem && getId(draggedItem.data) !== getId(targetItem.data)) {
        onDocumentDrag(draggedItem, targetItem)
      } else if (!targetItem) {
        onDocumentDrag(draggedItem, undefined)
      }
    },
    [draggedItem, onDocumentDrag, getId]
  )

  const expandedItemIds = React.useMemo(() => {
    if (!initialSelectedItemId) {
      return [] as string[]
    }

    const ids: string[] = []

    function walkTreeItems(
      items: TreeDataItem<T>[] | TreeDataItem<T>,
      targetId: string
    ): boolean | undefined {
      if (Array.isArray(items)) {
        for (const item of items) {
          ids.push(getId(item.data))

          if (walkTreeItems(item, targetId) && !expandAll) {
            return true
          }

          if (!expandAll) {
            ids.pop()
          }
        }
      } else if (!expandAll && getId(items.data) === targetId) {
        return true
      } else if (items.children) {
        return walkTreeItems(items.children, targetId)
      }
    }

    walkTreeItems(data, initialSelectedItemId)
    return ids
  }, [data, expandAll, initialSelectedItemId])

  return (
    <div className={cn('overflow-hidden relative p-2', className)}>
      <TreeItem
        data={data}
        ref={ref}
        selectedItemId={selectedItemId}
        handleSelectChange={handleSelectChange}
        expandedItemIds={expandedItemIds}
        defaultLeafIcon={defaultLeafIcon}
        defaultNodeIcon={defaultNodeIcon}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        draggedItem={draggedItem}
        renderItem={renderItem}
        level={0}
        getId={getId}
        getName={getName}
        {...props}
      />
      <div
        className="w-full h-12"
        onDrop={() => {
          handleDrop()
        }}
      />
    </div>
  )
}

const TreeView = React.forwardRef(TreeViewInner) as <T>(
  _props: TreeProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement

;(TreeView as React.NamedExoticComponent).displayName = 'TreeView'

type TreeItemProps<T> = TreeProps<T> & {
  selectedItemId?: string
  handleSelectChange: (_item: TreeDataItem<T> | undefined) => void
  expandedItemIds: string[]
  defaultNodeIcon?: React.ComponentType<{ className?: string }>
  defaultLeafIcon?: React.ComponentType<{ className?: string }>
  handleDragStart?: (_item: TreeDataItem<T>) => void
  handleDrop?: (_item: TreeDataItem<T>) => void
  draggedItem: TreeDataItem<T> | null
  level?: number
}

const TreeItemInner = <T,>(
  {
    className,
    data,
    selectedItemId,
    handleSelectChange,
    expandedItemIds,
    defaultNodeIcon,
    defaultLeafIcon,
    handleDragStart,
    handleDrop,
    draggedItem,
    renderItem,
    level,
    getId,
    getName,
    ...props
  }: TreeItemProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const items = Array.isArray(data) ? data : [data]

  return (
    <div ref={ref} role="tree" className={className} {...props}>
      <ul>
        {items.map(item => (
          <li key={getId(item.data)}>
            {item.children ? (
              <TreeNode
                item={item}
                level={level ?? 0}
                selectedItemId={selectedItemId}
                expandedItemIds={expandedItemIds}
                handleSelectChange={handleSelectChange}
                defaultNodeIcon={defaultNodeIcon}
                defaultLeafIcon={defaultLeafIcon}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
                draggedItem={draggedItem}
                renderItem={renderItem}
                getId={getId}
                getName={getName}
              />
            ) : (
              <TreeLeaf
                item={item}
                level={level ?? 0}
                selectedItemId={selectedItemId}
                handleSelectChange={handleSelectChange}
                defaultLeafIcon={defaultLeafIcon}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
                draggedItem={draggedItem}
                renderItem={renderItem}
                getId={getId}
                getName={getName}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
const ForwardTreeItem = React.forwardRef(TreeItemInner)
ForwardTreeItem.displayName = 'TreeItem'
const TreeItem = ForwardTreeItem as <T>(
  _props: TreeItemProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement

const TreeNode = <T,>({
  item,
  handleSelectChange,
  expandedItemIds,
  selectedItemId,
  defaultNodeIcon,
  defaultLeafIcon,
  handleDragStart,
  handleDrop,
  draggedItem,
  renderItem,
  level = 0,
  getId,
  getName,
}: {
  item: TreeDataItem<T>
  handleSelectChange: (_item: TreeDataItem<T> | undefined) => void
  expandedItemIds: string[]
  selectedItemId?: string
  defaultNodeIcon?: React.ComponentType<{ className?: string }>
  defaultLeafIcon?: React.ComponentType<{ className?: string }>
  handleDragStart?: (_item: TreeDataItem<T>) => void
  handleDrop?: (_item: TreeDataItem<T>) => void
  draggedItem: TreeDataItem<T> | null
  renderItem?: (_params: TreeRenderItemParams<T>) => React.ReactNode
  level?: number
  getId: (_data: T) => string
  getName: (_data: T) => React.ReactNode
}) => {
  const itemId = getId(item.data)

  const [value, setValue] = React.useState(
    expandedItemIds.includes(itemId) ? [itemId] : []
  )
  const [isDragOver, setIsDragOver] = React.useState(false)
  const hasChildren = !!item.children?.length
  const isSelected = selectedItemId === itemId
  const isOpen = value.includes(itemId)

  const onDragStart = (e: React.DragEvent) => {
    if (!item.draggable) {
      e.preventDefault()
      return
    }
    e.dataTransfer.setData('text/plain', itemId)
    handleDragStart?.(item)
  }

  const onDragOver = (e: React.DragEvent) => {
    if (
      item.droppable !== false &&
      draggedItem &&
      getId(draggedItem.data) !== itemId
    ) {
      e.preventDefault()
      setIsDragOver(true)
    }
  }

  const onDragLeave = () => {
    setIsDragOver(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleDrop?.(item)
  }

  return (
    <AccordionPrimitive.Root
      type="multiple"
      value={value}
      onValueChange={s => setValue(s)}
    >
      <AccordionPrimitive.Item value={itemId}>
        <AccordionTrigger
          className={cn(
            treeVariants(),
            isSelected && selectedTreeVariants(),
            isDragOver && dragOverVariants(),
            item.className
          )}
          onClick={() => {
            handleSelectChange(item)
            item.onClick?.()
          }}
          draggable={!!item.draggable}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {renderItem ? (
            renderItem({
              item,
              level,
              isLeaf: false,
              isSelected,
              isOpen,
              hasChildren,
            })
          ) : (
            <>
              <TreeIcon
                item={item}
                isSelected={isSelected}
                isOpen={isOpen}
                default={defaultNodeIcon}
              />
              <span className="truncate">{getName(item.data)}</span>
              <TreeActions isSelected={isSelected}>{item.actions}</TreeActions>
            </>
          )}
        </AccordionTrigger>

        <AccordionContent className="ml-4 pl-1 border-l">
          <TreeItem
            data={item.children ? item.children : item}
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
            defaultLeafIcon={defaultLeafIcon}
            defaultNodeIcon={defaultNodeIcon}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            draggedItem={draggedItem}
            renderItem={renderItem}
            level={level + 1}
            getId={getId}
            getName={getName}
          />
        </AccordionContent>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  )
}

type TreeLeafProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  item: TreeDataItem<T>
  level: number
  selectedItemId?: string
  handleSelectChange: (_item: TreeDataItem<T> | undefined) => void
  defaultLeafIcon?: React.ComponentType<{ className?: string }>
  handleDragStart?: (_item: TreeDataItem<T>) => void
  handleDrop?: (_item: TreeDataItem<T>) => void
  draggedItem: TreeDataItem<T> | null
  renderItem?: (_params: TreeRenderItemParams<T>) => React.ReactNode
  getId: (_data: T) => string
  getName: (_data: T) => React.ReactNode
}

const TreeLeafInner = <T,>(
  {
    className,
    item,
    level,
    selectedItemId,
    handleSelectChange,
    defaultLeafIcon,
    handleDragStart,
    handleDrop,
    draggedItem,
    renderItem,
    getId,
    getName,
    ...props
  }: TreeLeafProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const itemId = getId(item.data)

  const [isDragOver, setIsDragOver] = React.useState(false)
  const isSelected = selectedItemId === itemId

  const onDragStart = (e: React.DragEvent) => {
    if (!item.draggable || item.disabled) {
      e.preventDefault()
      return
    }
    e.dataTransfer.setData('text/plain', itemId)
    handleDragStart?.(item)
  }

  const onDragOver = (e: React.DragEvent) => {
    if (
      item.droppable !== false &&
      !item.disabled &&
      draggedItem &&
      getId(draggedItem.data) !== itemId
    ) {
      e.preventDefault()
      setIsDragOver(true)
    }
  }

  const onDragLeave = () => {
    setIsDragOver(false)
  }

  const onDrop = (e: React.DragEvent) => {
    if (item.disabled) return
    e.preventDefault()
    setIsDragOver(false)
    handleDrop?.(item)
  }

  return (
    <div
      ref={ref}
      className={cn(
        'ml-5 flex text-left items-center py-2 cursor-pointer before:right-1',
        treeVariants(),
        className,
        isSelected && selectedTreeVariants(),
        isDragOver && dragOverVariants(),
        item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        item.className
      )}
      onClick={() => {
        if (item.disabled) return
        handleSelectChange(item)
        item.onClick?.()
      }}
      draggable={!!item.draggable && !item.disabled}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      {...props}
    >
      {renderItem ? (
        <>
          {renderItem({
            item,
            level,
            isLeaf: true,
            isSelected,
            hasChildren: false,
          })}
        </>
      ) : (
        <>
          <TreeIcon
            item={item}
            isSelected={isSelected}
            default={defaultLeafIcon}
          />
          <span className="grow truncate">{getName(item.data)}</span>
          <TreeActions isSelected={isSelected && !item.disabled}>
            {item.actions}
          </TreeActions>
        </>
      )}
    </div>
  )
}

const ForwardTreeLeaf = React.forwardRef(TreeLeafInner)

ForwardTreeLeaf.displayName = 'TreeLeaf'

const TreeLeaf = ForwardTreeLeaf as <T>(
  _props: TreeLeafProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 w-full items-center py-2 transition-all first:[&[data-state=open]>svg]:first-of-type:rotate-90',
        className
      )}
      {...props}
    >
      <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50 mr-1" />
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="pb-1 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

const TreeIcon = <T,>({
  item,
  isOpen,
  isSelected,
  default: defaultIcon,
}: {
  item: TreeDataItem<T>
  isOpen?: boolean
  isSelected?: boolean
  default?: React.ComponentType<{ className?: string }>
}) => {
  let Icon: React.ComponentType<{ className?: string }> | undefined =
    defaultIcon
  if (isSelected && item.selectedIcon) {
    Icon = item.selectedIcon
  } else if (isOpen && item.openIcon) {
    Icon = item.openIcon
  } else if (item.icon) {
    Icon = item.icon
  }
  return Icon ? <Icon className="h-4 w-4 shrink-0 mr-2" /> : <></>
}

const TreeActions = ({
  children,
  isSelected,
}: {
  children: React.ReactNode
  isSelected: boolean
}) => {
  return (
    <div
      className={cn(
        isSelected ? 'block' : 'hidden',
        'absolute right-3 group-hover:block'
      )}
    >
      {children}
    </div>
  )
}

export {
  AccordionContent,
  AccordionTrigger,
  TreeItem,
  TreeLeaf,
  TreeNode,
  type TreeRenderItemParams,
  TreeView,
}
