/// <reference types="@amap/amap-jsapi-types" />

export {}

declare global {
  namespace AMap {
    interface MapOptions {
      terrain?: boolean
      pitch?: number
      rotation?: number
      rotateEnable?: boolean
      pitchEnable?: boolean
      buildingAnimation?: boolean
      showBuildingBlock?: boolean
      expandZoomRange?: boolean
      zooms?: [number, number]
    }

    type AMapCallback<T = unknown> = (status: string, result?: T) => void

    type LngLatLike = [number, number]

    type AMapLocation = {
      lng: number
      lat: number
    }

    class Scale extends Control {
      constructor(options?: Record<string, unknown>)
    }

    class ToolBar extends Control {
      constructor(options?: Record<string, unknown>)
    }

    class HawkEye extends Control {
      constructor(options?: { isOpen?: boolean; opened?: boolean })
    }

    class ControlBar extends Control {
      constructor(options?: Record<string, unknown>)
    }

    class Geolocation extends Control {
      constructor(options?: Record<string, unknown>)

      getCurrentPosition(
        callback: AMapCallback<{
          position?: AMapLocation
          info?: string
          message?: string
          originMessage?: string
          status?: number
          [key: string]: unknown
        }>
      ): void
    }

    class PlaceSearch {
      constructor(options?: {
        city?: string
        pageSize?: number
        pageIndex?: number
      })

      search(
        keyword: string,
        callback: AMapCallback<{
          poiList?: {
            pois?: Array<{
              id?: string
              name?: string
              address?: string
              location?: AMapLocation
            }>
          }
          [key: string]: unknown
        }>
      ): void

      searchNearBy(
        keyword: string,
        center: [number, number],
        radius: number,
        callback: AMapCallback<{
          poiList?: {
            pois?: Array<{
              id?: string
              name?: string
              address?: string
              location?: AMapLocation
              distance?: number
            }>
          }
          [key: string]: unknown
        }>
      ): void
    }

    class AutoComplete {
      constructor(options?: { city?: string; citylimit?: boolean })

      search(
        keyword: string,
        callback: AMapCallback<{
          tips?: Array<{
            id?: string
            name?: string
            district?: string
            address?: string
            location?: AMapLocation
          }>
          [key: string]: unknown
        }>
      ): void
    }

    class Geocoder {
      constructor(options?: Record<string, unknown>)

      getAddress(
        location: LngLatLike,
        callback: AMapCallback<{
          regeocode?: {
            formattedAddress?: string
            addressComponent?: {
              province?: string
              city?: string | string[]
              district?: string
              adcode?: string
            }
          }
          [key: string]: unknown
        }>
      ): void
    }

    class Driving {
      constructor(options?: { map?: Map; panel?: string; policy?: number })

      search(
        start: LngLatLike,
        end: LngLatLike,
        opts?: {
          waypoints?: LngLatLike[]
        },
        callback?: AMapCallback
      ): void

      clear(): void
    }
  }

  interface Window {
    _AMapSecurityConfig?: {
      securityJsCode?: string
      serviceHost?: string
    }

    __amapAction?: {
      setPickedAsWaypoint: () => void
      setPickedAsDestination: () => void
      startRouteByPicked: () => void
      startRoute: () => void
    }
  }
}
