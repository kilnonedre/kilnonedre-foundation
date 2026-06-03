export type LngLat = [number, number]
export type Offset = [number, number]

export interface ConfigAutoCompleteTip {
  id?: string
  name: string
  district?: string
  address?: string
  location?: {
    lng: number
    lat: number
  }
}

export interface ConfigDrivingInstance {
  search: (
    start: LngLat,
    end: LngLat,
    opts: {
      waypoints?: LngLat[]
    },
    callback: (status: string, result: unknown) => void
  ) => void
  clear: () => void
}

export type ConfigAMapWithDriving = typeof AMap & {
  Driving: new (options: {
    map: AMap.Map
    panel?: string
    policy?: number
  }) => ConfigDrivingInstance
}
