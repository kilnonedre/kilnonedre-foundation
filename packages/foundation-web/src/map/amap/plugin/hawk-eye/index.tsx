import { useEffect } from 'react'
import { useAMapContext } from '@/map/amap/context'
import type * as types from './type'

export const HawkEye = ({ isOpen = false }: types.ConfigProp) => {
  const { map, AMap } = useAMapContext()

  useEffect(() => {
    if (!map || !AMap) return

    const control = new AMap.HawkEye({
      isOpen,
    })

    map.addControl(control)

    return () => {
      map.removeControl(control)
    }
  }, [map, AMap])

  return null
}
