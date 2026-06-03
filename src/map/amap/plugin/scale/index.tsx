import { useEffect } from 'react'
import { useAMapContext } from '@/map/amap/context'
import { EnumAMapPluginPosition } from '@/type'
import type * as types from './type'

export const Scale = ({
  position = EnumAMapPluginPosition.LB,
}: types.ConfigProp) => {
  const { map, AMap } = useAMapContext()

  useEffect(() => {
    if (!map || !AMap) return

    const control = new AMap.Scale({
      position,
    })

    map.addControl(control)

    return () => {
      map.removeControl(control)
    }
  }, [map, AMap])

  return null
}
