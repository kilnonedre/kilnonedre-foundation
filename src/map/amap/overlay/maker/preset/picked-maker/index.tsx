import { Marker } from '@/map/amap/overlay/maker'
import { EnumMarkerType } from '@/type'
import type * as types from './type'

export const PickedMaker = (props: types.ConfigProp) => {
  return (
    props.location && (
      <Marker
        position={[props.location.longitude, props.location.latitude]}
        type={EnumMarkerType.PICKED}
        title="点选位置"
        body={`
          <div>${props.location.poiName || props.location.address}</div>
          <div>经度：${props.location.longitude}</div>
          <div>纬度：${props.location.latitude}</div>
        `}
        actions={`
          <button onclick="window.__amapAction?.setPickedAsWaypoint()">设为途经点</button>
          <button onclick="window.__amapAction?.setPickedAsDestination()">设为终点</button>
          <button onclick="window.__amapAction?.startRouteByPicked()">导航</button>
        `}
      />
    )
  )
}
