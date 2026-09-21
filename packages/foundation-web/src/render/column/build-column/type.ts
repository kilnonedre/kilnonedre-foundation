import type { ReactNode } from 'react'
import type { CellContext } from '@tanstack/react-table'

export interface ConfigProp<T extends object, K extends keyof T> {
  key: K
  label: string
  tip?: string
  minWidth?: number
  visible?: (_value: T[K], _row: T, _ctx: CellContext<T, unknown>) => boolean
  render?: (_value: T[K], _row: T, _ctx: CellContext<T, unknown>) => ReactNode
}
