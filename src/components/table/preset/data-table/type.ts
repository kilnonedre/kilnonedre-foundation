import type { ReactNode } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { UUID } from '@/type'
import { ConfigApiRespT, ConfigListRespT } from '@/type/api'

export type SortingItem = {
  id: string
  desc: boolean
}

export type SearchbarCtx = {
  filters: Record<string, unknown>
  setFilters: (
    _updater: (_prev: Record<string, unknown>) => Record<string, unknown>
  ) => void
  search: () => void
  reset: () => void
}

export type AdvancedFilterCtx = {
  draftFilters: Record<string, unknown>
  setDraftFilters: (
    _updater: (_prev: Record<string, unknown>) => Record<string, unknown>
  ) => void
}

export type ConfigProp<T, P> = {
  columns: Array<ColumnDef<T>>
  renderList: (_params: P) => Promise<ConfigApiRespT<ConfigListRespT<T>>>
  getRowId?: (_row: T) => string

  keyword?: string
  filters?: Record<string, unknown>
  onFiltersChange?: (_filters: Record<string, unknown>) => void

  searchable?: boolean
  searchbar?: (_ctx: SearchbarCtx) => ReactNode
  advancedFilter?: (_ctx: AdvancedFilterCtx) => ReactNode

  toolbar?: (_ctx: { refresh: () => void }) => ReactNode

  meta?: Record<string, unknown>
  navigate?: (_id: UUID) => void
}
