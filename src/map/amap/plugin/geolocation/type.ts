import { EnumAMapPluginPosition, LngLat } from '@/type'

export interface ConfigProp {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
  convert?: boolean

  showButton?: boolean
  showMarker?: boolean
  showCircle?: boolean
  zoomToAccuracy?: boolean

  position?: EnumAMapPluginPosition
  offset?: [number, number]

  moveToLocation?: boolean
  zoom?: number

  onComplete?: (position: LngLat, result: AMap.ConfigGeolocationResult) => void
  onError?: (result: unknown) => void
}
