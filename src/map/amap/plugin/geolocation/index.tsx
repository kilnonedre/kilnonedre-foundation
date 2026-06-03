import { useEffect } from 'react'
import { useAMapContext } from '@/map/amap/context'
import { EnumAMapPluginPosition, LngLat } from '@/type'
import type * as types from './type'

const isValidPosition = (
  result?: AMap.ConfigGeolocationResult
): result is AMap.ConfigGeolocationResult & {
  position: {
    lng: number
    lat: number
  }
} => {
  return (
    typeof result?.position?.lng === 'number' &&
    typeof result.position.lat === 'number'
  )
}

const toLngLat = (
  result: AMap.ConfigGeolocationResult & {
    position: {
      lng: number
      lat: number
    }
  }
): LngLat => {
  return [result.position.lng, result.position.lat]
}

export const Geolocation = (_props: types.ConfigProps) => {
  const props = {
    enableHighAccuracy: false,
    timeout: 20000,
    maximumAge: 60000,
    convert: true,
    showButton: true,
    showMarker: false,
    showCircle: false,
    zoomToAccuracy: true,
    position: EnumAMapPluginPosition.RB,
    offset: [18, 20],
    moveToLocation: true,
    zoom: 17,
    ..._props,
  }

  const { map, AMap } = useAMapContext()

  useEffect(() => {
    if (!map || !AMap) return

    const moveMap = (nextPosition: LngLat) => {
      if (!props.moveToLocation) return

      map.setCenter(nextPosition)
      map.setZoom(props.zoom)
    }

    const handleResult = (
      status: string,
      result?: AMap.ConfigGeolocationResult
    ) => {
      if (status !== 'complete' || !isValidPosition(result)) {
        props.onError?.(result)
        return
      }

      const nextPosition = toLngLat(result)

      moveMap(nextPosition)
      props.onComplete?.(nextPosition, result)
    }

    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: props.enableHighAccuracy,
      timeout: props.timeout,
      maximumAge: props.maximumAge,
      convert: props.convert,
      showButton: props.showButton,
      showMarker: props.showMarker,
      showCircle: props.showCircle,
      zoomToAccuracy: props.zoomToAccuracy,
      position: props.position,
      offset: props.offset,
    })

    map.addControl(geolocation)

    geolocation.getCurrentPosition((status, result) => {
      handleResult(status, result)
    })

    return () => {
      map.removeControl(geolocation)
    }
  }, [map, AMap])

  return null
}
