import { ReactNode } from 'react'

export interface ConfigProp {
  aKey: string
  securityCode: string
  version?: string
  children?: ReactNode
}
