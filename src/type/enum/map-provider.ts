// 地图来源
export const EnumMapProvider = {
  AMAP: 'AMAP',
  TENCENT: 'TENCENT',
} as const

export type EnumMapProvider =
  (typeof EnumMapProvider)[keyof typeof EnumMapProvider]

export const EnumMapProviderLabel: Record<EnumMapProvider, string> = {
  AMAP: '高德地图',
  TENCENT: '腾讯地图',
}
