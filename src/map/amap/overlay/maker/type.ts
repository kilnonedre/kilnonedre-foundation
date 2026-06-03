import { EnumMarkerType, LngLat } from '@/type'

export interface ConfigProp {
  position: LngLat
  type: EnumMarkerType
  title: string
  body?: string
  actions?: string
  offset?: [number, number]
  onClick?: () => void
  onCreate?: (marker: AMap.Marker) => void
}
