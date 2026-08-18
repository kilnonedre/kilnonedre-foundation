import { ConfigAMapWithDriving, LngLat } from '@kilnonedre/foundation'
import { createContext, useContext } from 'react'

export interface ConfigOpenInfoWindow {
  position: LngLat
  title: string
  body?: string
  actions?: string
}

export interface AMapContextValue {
  map: AMap.Map | null
  AMap: ConfigAMapWithDriving | null
  openInfoWindow: (params: ConfigOpenInfoWindow) => void
}

export const AMapContext = createContext<AMapContextValue>({
  map: null,
  AMap: null,
  openInfoWindow: () => {},
})

export const useAMapContext = () => {
  return useContext(AMapContext)
}
