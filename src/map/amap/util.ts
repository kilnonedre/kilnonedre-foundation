import { markerIconMap } from '@/map/amap/data'
import { ConfigAMapWithDriving, EnumMarkerType } from '@/type'

export const createMarkerIcon = (
  AMapTyped: ConfigAMapWithDriving,
  type: EnumMarkerType
) => {
  return new AMapTyped.Icon({
    image: markerIconMap[type],
    imageSize: new AMapTyped.Size(25, 34),
  })
}
