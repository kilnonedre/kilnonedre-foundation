import { useEffect } from 'react'
import { useAMapContext } from '@/map/amap/context'
import type * as types from './type'
import { EnumAMapPluginPosition } from '@kilnonedre/foundation'

export const ToolBar = ({
  position = EnumAMapPluginPosition.RB,
  offset = [20, 60],
}: types.ConfigProp) => {
  const { map, AMap } = useAMapContext()

  useEffect(() => {
    if (!map || !AMap) return

    const control = new AMap.ToolBar({
      position,
      offset,
    })

    map.addControl(control)

    return () => {
      map.removeControl(control)
    }
  }, [map, AMap])

  return null
}
