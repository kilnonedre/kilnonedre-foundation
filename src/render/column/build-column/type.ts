import { ReactNode } from 'react'

export interface ConfigProp<
  T extends Record<string, unknown>,
  K extends keyof T,
> {
  key: K
  label: string
  render?: (_value: T[K], _row: T) => ReactNode
}
