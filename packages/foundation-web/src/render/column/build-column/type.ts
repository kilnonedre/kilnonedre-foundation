import { ReactNode } from 'react'
import { CellContext } from '@tanstack/react-table'

export interface ConfigProp<T extends object, K extends keyof T> {
  key: K
  label: string
  tip?: string
  minWidth?: number
  render?: (_value: T[K], _row: T, _ctx: CellContext<T, unknown>) => ReactNode
}
