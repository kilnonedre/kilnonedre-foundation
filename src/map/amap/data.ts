import { CommonOptionT, EnumMarkerType } from '@/type'

export const drivingPolicyList: Array<CommonOptionT<number>> = [
  { label: '速度优先', value: 0 },
  { label: '费用最低', value: 1 },
  { label: '距离最短', value: 2 },
  { label: '实时路况', value: 4 },
]

export const markerIconMap: Record<EnumMarkerType, string> = {
  [EnumMarkerType.DRIVER]:
    'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-blue.png',
  [EnumMarkerType.PICKED]:
    'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
  [EnumMarkerType.DESTINATION]:
    'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
  [EnumMarkerType.WAYPOINT]:
    'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
}
