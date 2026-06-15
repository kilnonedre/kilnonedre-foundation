import { EnumMapProvider } from '@/type'
import { UUID } from '@/type/uuid'

export interface CommonLocationResp extends CommonLocation {
  id: UUID // 地理位置ID
}

export interface CommonLocation {
  longitude: number // 经度
  latitude: number // 纬度
  address: string // 地址
  province: string // 省份
  city: string // 城市
  district: string // 区县
  adCode: string // 行政区划编码
  poiId?: string // POI ID
  poiName?: string // POI名称
  mapProvider: EnumMapProvider // 地图数据来源
}
