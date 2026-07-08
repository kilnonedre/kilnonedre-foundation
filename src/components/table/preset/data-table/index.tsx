/* eslint complexity: ["error", 20] */
import { useEffect, useMemo, useState } from 'react'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { FilterIcon, RotateCcwIcon } from 'lucide-react'
import { Button } from '@/components/button'
import {
  TableColumnVisibility,
  TableContent,
} from '@/components/table/component'
import {
  KeywordSearchBar,
  TablePagination,
} from '@/components/table/preset/data-table/component'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shadcn/components/sheet'
import { EnumSemanticColor, EnumVariant } from '@/type'
import { isEmpty } from '@/util'
import type * as types from './type'

export * from './component'

const buildParams = (
  page: number,
  size: number,
  keyword: string | undefined,
  filters: Record<string, unknown>,
  sorting: Array<{ id: string; desc: boolean }>
): Record<string, unknown> => {
  const result: Record<string, unknown> = { page, size }

  if (!isEmpty(keyword)) {
    result.keyword = keyword
  }

  Object.entries(filters).forEach(([k, v]) => {
    if (!isEmpty(v)) {
      result[k] = v
    }
  })

  if (sorting.length > 0) {
    result.sorting = sorting
      .map(item => `${item.id}:${item.desc ? 'desc' : 'asc'}`)
      .join(',')
  }

  return result
}

export const DataTable = <T, P>(props: types.ConfigProp<T, P>) => {
  const [data, setData] = useState<Array<T>>(new Array<T>())
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const sizeList: Array<number> = [10, 20, 30, 40, 50]

  const [totalPage, setTotalPage] = useState<number>(0)
  const [size, setSize] = useState<number>(sizeList[0])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [refreshKey, setRefreshKey] = useState<number>(0)

  const [filtersState, setFiltersState] = useState<Record<string, unknown>>(
    props.filters ?? {}
  )
  const [draftFilters, setDraftFilters] = useState<Record<string, unknown>>(
    props.filters ?? {}
  )
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false)

  const requestSorting = useMemo(
    () =>
      sorting.map(item => ({
        id: item.id,
        desc: item.desc,
      })),
    [sorting]
  )

  const syncFilters = (next: Record<string, unknown>) => {
    setFiltersState(next)
    props.onFiltersChange?.(next)

    if (currentPage === 1) {
      setRefreshKey(v => v + 1)
      return
    }

    setCurrentPage(1)
  }

  const resetFilters = () => {
    setDraftFilters({})
    setFiltersState({})
    props.onFiltersChange?.({})

    if (currentPage === 1) {
      setRefreshKey(v => v + 1)
    } else {
      setCurrentPage(1)
    }

    setAdvancedOpen(false)
  }

  const confirmAdvanced = () => {
    syncFilters(draftFilters)
    setAdvancedOpen(false)
  }

  const refresh = async () => {
    const params = buildParams(
      currentPage,
      size,
      props.keyword,
      filtersState,
      requestSorting
    ) as P

    const resp = await props.renderList(params)

    if (resp.code !== '200') return

    const { items, pageInfo } = resp.data

    if (items.length === 0 && currentPage > 1 && pageInfo.totalPage > 0) {
      setCurrentPage(currentPage - 1)
      return
    }

    if (pageInfo.totalPage > 0 && currentPage > pageInfo.totalPage) {
      setCurrentPage(pageInfo.totalPage)
      return
    }

    setData(items)
    setSize(pageInfo.size)
    setCurrentPage(pageInfo.page)
    setTotalPage(pageInfo.totalPage)
  }

  useEffect(() => {
    refresh()
  }, [
    currentPage,
    size,
    props.keyword,
    filtersState,
    requestSorting,
    refreshKey,
  ])

  useEffect(() => {
    const next = props.filters ?? {}
    setFiltersState(next)
    setDraftFilters(next)
  }, [props.filters])

  const table = useReactTable({
    data,
    columns: props.columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    meta: {
      ...props.meta,
      refresh,
      navigate: props.navigate,
    },
    getRowId: props.getRowId
      ? row => props.getRowId!(row)
      : (_: T, index: number) => index.toString(),
    enableRowSelection: true,
    onRowSelectionChange: updater =>
      setRowSelection(prev =>
        typeof updater === 'function' ? updater(prev) : updater
      ),
    onSortingChange: updater =>
      setSorting(prev =>
        typeof updater === 'function' ? updater(prev) : updater
      ),
    onColumnFiltersChange: updater =>
      setColumnFilters(prev =>
        typeof updater === 'function' ? updater(prev) : updater
      ),
    onColumnVisibilityChange: updater =>
      setColumnVisibility(prev =>
        typeof updater === 'function' ? updater(prev) : updater
      ),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const renderSearchbar = () => {
    const ctx: types.SearchbarCtx = {
      filters: draftFilters,
      setFilters: updater => setDraftFilters(prev => updater(prev)),
      search: () => syncFilters(draftFilters),
      reset: resetFilters,
    }

    if (props.searchbar) {
      return props.searchbar(ctx)
    }

    if (!props.searchable) return null

    return (
      <KeywordSearchBar
        value={(draftFilters.keyword as string) ?? ''}
        onSearch={ctx.search}
        onChange={value =>
          ctx.setFilters(prev => ({
            ...prev,
            keyword: value,
          }))
        }
      />
    )
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex flex-1 items-center gap-2">
          {renderSearchbar()}

          {props.advancedFilter && (
            <Button
              size="sm"
              variant={EnumVariant.OUTLINE}
              onClick={() => {
                setDraftFilters(filtersState)
                setAdvancedOpen(true)
              }}
            >
              <FilterIcon />
              更多筛选
            </Button>
          )}

          {(props.searchable || props.searchbar || props.advancedFilter) && (
            <Button
              variant={EnumVariant.GHOST}
              size="sm"
              onClick={resetFilters}
            >
              <RotateCcwIcon />
              重置
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <TableColumnVisibility table={table} />
          {props.toolbar?.({ refresh })}
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-auto px-4 pb-0.5 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <TableContent table={table} columns={props.columns} />
        </div>

        <div className="flex items-center justify-end px-4">
          <TablePagination
            currentPage={currentPage}
            totalPage={totalPage}
            size={size}
            sizeList={sizeList}
            onUpdateSize={s => {
              setSize(s)
              setCurrentPage(1)
            }}
            onUpdateCurrentPage={page => setCurrentPage(page)}
          />
        </div>
      </div>

      {props.advancedFilter && (
        <Sheet open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <SheetContent className="flex w-[420px] flex-col p-0">
            <SheetHeader className="border-b px-6 py-4">
              <SheetTitle>更多筛选</SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {props.advancedFilter({
                draftFilters,
                setDraftFilters: updater =>
                  setDraftFilters(prev => updater(prev)),
              })}
            </div>

            <SheetFooter className="border-t px-6 py-4">
              <Button
                className="flex-1"
                variant={EnumVariant.OUTLINE}
                onClick={resetFilters}
              >
                重置
              </Button>
              <Button
                semanticColor={EnumSemanticColor.DARK}
                className="flex-1"
                onClick={confirmAdvanced}
              >
                确认筛选
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
