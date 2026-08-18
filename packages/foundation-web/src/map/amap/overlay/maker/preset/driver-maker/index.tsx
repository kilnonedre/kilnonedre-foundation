import { Marker } from '@/map/amap/overlay/maker'
import type * as types from './type'
import { EnumMarkerType } from '@kilnonedre/foundation'

export const DriverMaker = (props: types.ConfigProp) => {
  return (
    props.position && (
      <Marker
        position={props.position}
        type={EnumMarkerType.DRIVER}
        title="司机位置"
        body={`
          <div>经度：${props.position[0]}</div>
          <div>纬度：${props.position[1]}</div>
          `}
        actions={`
          <button onclick="window.__amapAction?.startRoute()">从司机位置导航</button>
        `}
      />
    )
  )
}
