import { useMemo } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shadcn/components/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/select'
import type * as types from './type'

const buildPages = (current: number, total: number): Array<types.PageItem> => {
  if (total <= 0) return []
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => ({
      type: 'page' as const,
      page: i + 1,
    }))
  }

  const items: types.PageItem[] = []
  const pushPage = (p: number) => items.push({ type: 'page', page: p })
  const pushEllipsis = (key: string) => items.push({ type: 'ellipsis', key })

  if (current >= total - 4) {
    pushPage(1)
    pushEllipsis('left')
    for (let p = total - 4; p <= total; p++) pushPage(p)
    return items
  }

  if (current <= 4) {
    for (let p = 1; p <= 5; p++) pushPage(p)
    pushEllipsis('right')
    pushPage(total)
    return items
  }

  pushPage(1)
  pushEllipsis('left')
  pushPage(current - 1)
  pushPage(current)
  pushPage(current + 1)
  pushEllipsis('right')
  pushPage(total)
  return items
}

export const TablePagination = (props: types.ConfigProp) => {
  const updateCurrentPage = (page: number) => {
    if (page < 1 || page > props.totalPage) return
    props.onUpdateCurrentPage(page)
  }

  const pageItems = useMemo(
    () => buildPages(props.currentPage, props.totalPage),
    [props]
  )

  return (
    <div className="flex w-full items-center gap-8 lg:w-fit">
      <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => updateCurrentPage(props.currentPage - 1)}
                aria-disabled={props.currentPage === 1}
                className={
                  props.currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>

            {pageItems.map(item => {
              if (item.type === 'ellipsis') {
                return (
                  <PaginationItem key={item.key}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }

              return (
                <PaginationItem key={item.page}>
                  <PaginationLink
                    isActive={props.currentPage === item.page}
                    onClick={() => updateCurrentPage(item.page)}
                  >
                    {item.page}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => updateCurrentPage(props.currentPage + 1)}
                aria-disabled={props.currentPage === props.totalPage}
                className={
                  props.currentPage === props.totalPage
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="hidden items-center gap-2 lg:flex">
        <Select
          value={String(props.size)}
          onValueChange={value => {
            props.onUpdateSize(Number(value))
          }}
        >
          <SelectTrigger className="w-20" id="rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {props.sizeList.map(pageSize => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}/页
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
