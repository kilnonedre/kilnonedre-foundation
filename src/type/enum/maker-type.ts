import { enumToOptions } from '@/util'

// 地图标记类型
export const EnumMarkerType = {
  DRIVER: 'DRIVER',
  PICKED: 'PICKED',
  DESTINATION: 'DESTINATION',
  WAYPOINT: 'WAYPOINT',
} as const

export type EnumMarkerType =
  (typeof EnumMarkerType)[keyof typeof EnumMarkerType]

export const EnumMarkerTypeLabel: Record<EnumMarkerType, string> = {
  DRIVER: '司机位置',
  PICKED: '点选位置',
  DESTINATION: '终点位置',
  WAYPOINT: '途经点',
}

export const enumMarkerTypeOptions = enumToOptions(
  EnumMarkerType,
  EnumMarkerTypeLabel
)
