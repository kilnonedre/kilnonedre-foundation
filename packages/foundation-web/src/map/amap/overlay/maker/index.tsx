import { useEffect } from 'react'
import { useAMapContext } from '@/map/amap/context'
import { createMarkerIcon } from '@/map/amap/util'
import type * as types from './type'

export const Marker = ({
  position,
  type,
  title,
  body,
  actions,
  offset = [-13, -30],
  onClick,
  onCreate,
}: types.ConfigProp) => {
  const { map, AMap, openInfoWindow } = useAMapContext()

  useEffect(() => {
    if (!map || !AMap) return

    const marker = new AMap.Marker({
      map,
      position,
      icon: createMarkerIcon(AMap, type),
      offset,
      title,
    })

    marker.on('click', () => {
      if (onClick) {
        onClick()
        return
      }

      openInfoWindow({
        position,
        title,
        body,
        actions,
      })
    })

    onCreate?.(marker)

    return () => {
      map.remove(marker)
    }
  }, [
    map,
    AMap,
    position,
    type,
    title,
    body,
    actions,
    offset,
    onClick,
    onCreate,
    openInfoWindow,
  ])

  return null
}
