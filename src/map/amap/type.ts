import { ReactNode } from 'react'
import { CommonLocation, LngLat } from '@/type'

export interface ConfigProp {
  aKey: string
  securityCode: string
  version?: string
  children?: ReactNode
  center?: LngLat
  onPickedLocationChange?: (location: CommonLocation) => void
}
