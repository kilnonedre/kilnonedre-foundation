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

    interface ConfigAMapLocation {
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

    interface ConfigGeolocationResult {
      position?: ConfigAMapLocation
      info?: string
      message?: string
      originMessage?: string
      status?: number
      [key: string]: unknown
    }

    interface ConfigPoi {
      id: string
      name: string
      address: string
      location: AMapLocation
      distance?: number
    }

    class Geolocation extends Control {
      constructor(options?: Record<string, unknown>)

      getCurrentPosition(callback: AMapCallback<ConfigGeolocationResult>): void
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
            pois?: Array<ConfigPoi>
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
            pois?: Array<ConfigPoi>
          }
          [key: string]: unknown
        }>
      ): void
    }

    interface ConfigAutoCompleteTip {
      id: string
      location: ConfigAMapLocation
      name: string
      adcode: string
      address: string
      city: Array<unknown>
      district: string
      typecode: string
    }

    class AutoComplete {
      constructor(options?: { city?: string; citylimit?: boolean })

      search(
        keyword: string,
        callback: AMapCallback<{
          tips?: Array<ConfigAutoCompleteTip>
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
