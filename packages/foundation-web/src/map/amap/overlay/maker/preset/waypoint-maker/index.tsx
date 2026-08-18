import { Marker } from '@/map/amap/overlay/maker'
import type * as types from './type'
import { EnumMarkerType } from '@kilnonedre/foundation'

export const WaypointMaker = (props: types.ConfigProp) => {
  const titleSuffix = props.index ? ` ${props.index + 1}` : ''
  return (
    props.poiItem && (
      <Marker
        position={props.poiItem.location}
        type={EnumMarkerType.WAYPOINT}
        title={`途经点${titleSuffix}`}
        body={`
          <div>${props.poiItem.name}</div>
          <div>${props.poiItem.address}</div>
          <div>经度：${props.poiItem.location[0]}</div>
          <div>纬度：${props.poiItem.location[1]}</div>
        `}
        actions={`
          <button onclick="window.__amapAction?.startRoute()">重新规划</button>
        `}
      />
    )
  )
}
