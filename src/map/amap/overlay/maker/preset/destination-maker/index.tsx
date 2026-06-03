import { Marker } from '@/map/amap/overlay/maker'
import { EnumMarkerType } from '@/type'
import type * as types from './type'

export const DestinationMaker = (props: types.ConfigProp) => {
  return (
    props.location && (
      <Marker
        position={[props.location.longitude, props.location.latitude]}
        type={EnumMarkerType.DESTINATION}
        title="终点"
        body={`
          <div>${props.location.poiName || props.location.address}</div>
          <div>经度：${props.location.longitude}</div>
          <div>纬度：${props.location.latitude}</div>
          <div>省：${props.location.province}</div>
          <div>市：${props.location.city}</div>
          <div>区：${props.location.district}</div>
        `}
        actions={`
          <button onclick="window.__amapAction?.startRoute()">导航</button>
        `}
      />
    )
  )
}
