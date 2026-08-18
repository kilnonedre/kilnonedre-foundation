import { CommonLocation, LngLat } from '@kilnonedre/foundation'
import { ReactNode } from 'react'

export interface ConfigProp {
  aKey: string
  securityCode: string
  version?: string
  children?: ReactNode
  center?: LngLat
  onPickedLocationChange?: (location: CommonLocation) => void
}
