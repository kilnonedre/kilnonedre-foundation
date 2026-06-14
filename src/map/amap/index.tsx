/* eslint-disable complexity */
import {
  Children,
  DragEvent,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Button, Title } from '@/components'
import LocationCard from '@/map/amap/component/location-card'
import Search from '@/map/amap/component/search'
import { WaypointList } from '@/map/amap/component/waypoint-list'
import { AMapContext, AMapContextValue } from '@/map/amap/context'
import { drivingPolicyList } from '@/map/amap/data'
import { Marker } from '@/map/amap/overlay'
import { DestinationMaker } from '@/map/amap/overlay/maker/preset/destination-maker'
import { DriverMaker } from '@/map/amap/overlay/maker/preset/driver-maker'
import { PickedMaker } from '@/map/amap/overlay/maker/preset/picked-maker'
import { WaypointMaker } from '@/map/amap/overlay/maker/preset/waypoint-maker'
import { ControlBar, Scale } from '@/map/amap/plugin'
import { Geolocation } from '@/map/amap/plugin/geolocation'
import { HawkEye } from '@/map/amap/plugin/hawk-eye'
import { ToolBar } from '@/map/amap/plugin/tool-bar'
import { Separator } from '@/shadcn/components/separator'
import {
  CommonLocation,
  ConfigAMapWithDriving,
  ConfigAutoCompleteTip,
  ConfigDrivingInstance,
  EnumSemanticColor,
  EnumVariant,
  LngLat,
} from '@/type'
import { normalizeKeyword } from '@/util'
import type * as types from './type'

export * from './overlay'
export * from './plugin'

const AMapBase = ({ version = '2.0', ...props }: types.ConfigProp) => {
  const mapRef = useRef<AMap.Map | null>(null)
  const AMapRef = useRef<ConfigAMapWithDriving | null>(null)

  const infoWindowRef = useRef<AMap.InfoWindow | null>(null)

  const geocoderRef = useRef<AMap.Geocoder | null>(null)
  const placeSearchRef = useRef<AMap.PlaceSearch | null>(null)
  const autoCompleteRef = useRef<AMap.AutoComplete | null>(null)
  const drivingRef = useRef<ConfigDrivingInstance | null>(null)
  const driverWatchIdRef = useRef<number | null>(null)

  const pickedLocationRef = useRef<CommonLocation | null>(null)
  const destinationRef = useRef<CommonLocation | null>(null)
  const waypointsRef = useRef<Array<AMap.ConfigPoi>>([])
  const driverPositionRef = useRef<LngLat | null>(null)
  const draggedWaypointIndexRef = useRef<number | null>(null)

  const [keyword, setKeyword] = useState('')
  const [poiList, setPoiList] = useState<Array<AMap.ConfigPoi>>([])
  const [driverPosition, setDriverPosition] = useState<LngLat | null>(null)
  const [pickedLocation, setPickedLocation] = useState<CommonLocation | null>(
    null
  )
  const [destination, setDestination] = useState<CommonLocation | null>(null)
  const [waypoints, setWaypoints] = useState<Array<AMap.ConfigPoi>>([])
  const [drivingPolicy, setDrivingPolicy] = useState<number>(
    drivingPolicyList[0].value
  )

  const [contextValue, setContextValue] = useState<AMapContextValue>({
    map: null,
    AMap: null,
    openInfoWindow: () => {},
  })

  useEffect(() => {
    pickedLocationRef.current = pickedLocation
  }, [pickedLocation])

  useEffect(() => {
    destinationRef.current = destination
  }, [destination])

  useEffect(() => {
    waypointsRef.current = waypoints
  }, [waypoints])

  useEffect(() => {
    driverPositionRef.current = driverPosition
  }, [driverPosition])

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null

      if (!target) return
      if (target.closest('.amap-custom-info-window')) return
      if (target.closest('.amap-marker')) return
      if (target.closest('.amap-ui-control')) return
      if (target.closest('.amap-controls')) return

      infoWindowRef.current?.close()
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const openInfoWindow = (params: {
    position: LngLat
    title: string
    body?: string
    actions?: string
  }) => {
    const map = mapRef.current
    const infoWindow = infoWindowRef.current

    if (!map || !infoWindow) return

    infoWindow.setContent(`
      <div class="amap-custom-info-window" style="
        background:#fff;
        padding:10px;
        border-radius:8px;
        box-shadow:0 4px 16px rgba(0,0,0,.2);
        min-width:240px;
        max-width:320px;
        font-size:12px;
        line-height:1.5;
      ">
        <strong>${params.title}</strong>
        <div style="margin-top:6px;">${params.body ?? ''}</div>
        ${
          params.actions
            ? `<div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">${params.actions}</div>`
            : ''
        }
      </div>
    `)

    infoWindow.open(map, params.position)
  }

  useEffect(() => {
    const AMapTyped = AMapRef.current
    const map = mapRef.current

    if (!AMapTyped || !map) return

    drivingRef.current?.clear()

    drivingRef.current = new AMapTyped.Driving({
      map,
      panel: 'route-panel',
      policy: drivingPolicy,
    })
  }, [drivingPolicy])

  const handlePickMapPoint = (
    position: LngLat,
    poi?: {
      id?: string
      name?: string
    }
  ) => {
    const map = mapRef.current
    const geocoder = geocoderRef.current
    const placeSearch = placeSearchRef.current

    if (!map || !geocoder) return

    const [lng, lat] = position

    geocoder.getAddress(position, (status, result) => {
      if (status !== 'complete' || !result?.regeocode) {
        console.error('逆地理编码失败:', result)
        return
      }

      const regeocode = result.regeocode
      const addressComponent = regeocode.addressComponent

      if (!addressComponent) return

      const baseData: CommonLocation = {
        longitude: lng,
        latitude: lat,
        address: regeocode.formattedAddress || '',
        province: String(addressComponent.province || ''),
        city:
          typeof addressComponent.city === 'string'
            ? addressComponent.city
            : '',
        district: String(addressComponent.district || ''),
        adCode: String(addressComponent.adcode || ''),
        poiId: poi?.id,
        poiName: poi?.name,
      }

      const applyPickedLocation = (data: CommonLocation) => {
        console.log('点选位置:', data)

        setPickedLocation(data)
        props.onPickedLocationChange?.(data)
      }

      if (baseData.poiName || !placeSearch) {
        applyPickedLocation(baseData)
        return
      }

      placeSearch.searchNearBy('', position, 80, (nearStatus, nearResult) => {
        if (nearStatus !== 'complete' || !nearResult?.poiList?.pois?.length) {
          applyPickedLocation(baseData)
          return
        }

        const nearestPoi = nearResult.poiList.pois
          .filter(item => item.name)
          .sort((a, b) => (a.distance || 999999) - (b.distance || 999999))[0]

        if (!nearestPoi) {
          applyPickedLocation(baseData)
          return
        }

        applyPickedLocation({
          ...baseData,
          poiId: nearestPoi.id,
          poiName: nearestPoi.name,
          address: nearestPoi.address || baseData.address,
        })
      })
    })
  }

  const setDestinationByLocation = (location: CommonLocation) => {
    const map = mapRef.current

    if (!map) return

    setDestination(location)

    console.log('设置终点:', location)
  }

  const addWaypointByLocation = (location: CommonLocation) => {
    const currentWaypoints = waypointsRef.current

    if (currentWaypoints.length >= 16) {
      alert('途经点最多支持 16 个')
      return
    }

    const id = location.poiId || `${location.longitude}-${location.latitude}`

    if (currentWaypoints.some(item => item.id === id)) {
      alert('该途经点已存在')
      return
    }

    const waypoint: AMap.ConfigPoi = {
      id,
      name: location.poiName || location.address || '点选途经点',
      address: location.address,
      location: [location.longitude, location.latitude],
    }

    setWaypoints(prev => [...prev, waypoint])

    console.log('添加途经点:', waypoint)
  }

  const handleSearch = () => {
    const value = normalizeKeyword(keyword)

    if (!value) return

    const placeSearch = placeSearchRef.current
    const autoComplete = autoCompleteRef.current
    const map = mapRef.current

    if (!placeSearch && !autoComplete) return

    const center: LngLat | null = pickedLocationRef.current
      ? [
          pickedLocationRef.current.longitude,
          pickedLocationRef.current.latitude,
        ]
      : driverPositionRef.current ||
        (map?.getCenter ? [map.getCenter().lng, map.getCenter().lat] : null)

    const buildPoiList = (
      pois: Array<AMap.ConfigPoi>
    ): Array<AMap.ConfigPoi> => {
      return pois
        .filter(
          item =>
            item.name &&
            item.location?.lng != null &&
            item.location?.lat != null
        )
        .map(item => ({
          id: item.id || item.name || '',
          name: item.name || '',
          address:
            typeof item.distance === 'number'
              ? `${item.address || '暂无地址'} · 距离约 ${
                  item.distance >= 1000
                    ? `${(item.distance / 1000).toFixed(2)}km`
                    : `${Math.round(item.distance)}m`
                }`
              : item.address || '暂无地址',
          location: [item.location!.lng!, item.location!.lat!],
        }))
    }

    if (center && placeSearch?.searchNearBy) {
      placeSearch.searchNearBy(value, center, 5000, (status, result) => {
        if (status === 'complete' && result?.poiList?.pois?.length) {
          const list = buildPoiList(result.poiList.pois)

          console.log('附近搜索结果:', list)
          setPoiList(list)
          return
        }

        console.warn('附近搜索失败，降级为 AutoComplete:', result)

        autoComplete?.search(value, (autoStatus, autoResult) => {
          if (autoStatus !== 'complete' || !autoResult) {
            console.error('AutoComplete 搜索失败:', autoResult)
            setPoiList([])
            return
          }

          console.log('AutoComplete 搜索 Result:', autoResult)

          const tips = (autoResult.tips ?? []) as Array<ConfigAutoCompleteTip>

          const list: Array<AMap.ConfigPoi> = tips
            .filter(item => item.name)
            .map(item => ({
              id: item.id || item.name,
              name: item.name,
              address: item.address || item.district || '',
              location: item.location
                ? [item.location.lng, item.location.lat]
                : [0, 0],
            }))

          console.log('AutoComplete 搜索结果:', list)
          setPoiList(list)
        })
      })

      return
    }

    autoComplete?.search(value, (status, result) => {
      if (status !== 'complete' || !result) {
        console.error('AutoComplete 搜索失败:', result)
        setPoiList([])
        return
      }

      const tips = (result.tips ?? []) as Array<ConfigAutoCompleteTip>

      const list: Array<AMap.ConfigPoi> = tips
        .filter(item => item.name)
        .map(item => ({
          id: item.id || item.name,
          name: item.name,
          address: item.address || item.district || '',
          location: item.location
            ? [item.location.lng, item.location.lat]
            : [0, 0],
        }))

      console.log('AutoComplete 搜索结果:', list)
      setPoiList(list)
    })
  }

  const handleSelectPoiAsPick = (poi: AMap.ConfigPoi, moveCenter = false) => {
    const map = mapRef.current

    if (poi.location[0] !== 0 && poi.location[1] !== 0) {
      if (moveCenter && map) {
        map.setCenter(poi.location)
        map.setZoom(17)
      }

      handlePickMapPoint(poi.location, {
        id: poi.id,
        name: poi.name,
      })
      return
    }

    placeSearchRef.current?.search(poi.name, (status, result) => {
      if (status !== 'complete' || !result) {
        console.error('PlaceSearch 补查失败:', result)
        return
      }

      const first = result.poiList?.pois?.find(item => item.location)

      if (!first || !first.location) {
        console.error('未找到可用坐标:', poi)
        return
      }

      if (moveCenter && map) {
        const position: LngLat = [first.location.lng, first.location.lat]

        map.setCenter(position)
        map.setZoom(17)
      }

      handlePickMapPoint([first.location.lng, first.location.lat], {
        id: first.id,
        name: first.name,
      })
    })
  }

  const handleRemoveWaypoint = (id: string) => {
    setWaypoints(prev => prev.filter(item => item.id !== id))
  }

  const handleDragStartWaypoint = (index: number) => {
    draggedWaypointIndexRef.current = index
  }

  const handleDragOverWaypoint = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDropWaypoint = (targetIndex: number) => {
    const sourceIndex = draggedWaypointIndexRef.current

    if (sourceIndex === null || sourceIndex === targetIndex) {
      draggedWaypointIndexRef.current = null
      return
    }

    setWaypoints(prev => {
      const next = [...prev]
      const [moved] = next.splice(sourceIndex, 1)
      next.splice(targetIndex, 0, moved)
      return next
    })

    draggedWaypointIndexRef.current = null
  }

  const handleExitRoute = () => {
    drivingRef.current?.clear()

    const panel = document.getElementById('route-panel')
    if (panel) {
      panel.innerHTML = ''
    }
  }

  const handleClearRoute = () => {
    setWaypoints([])
    setDestination(null)

    drivingRef.current?.clear()

    const panel = document.getElementById('route-panel')
    if (panel) {
      panel.innerHTML = ''
    }
  }

  const handlePlanRoute = () => {
    const currentDriverPosition = driverPositionRef.current
    const currentDestination = destinationRef.current
    const currentWaypoints = waypointsRef.current

    if (!currentDriverPosition) {
      alert('还没有获取到司机位置')
      return
    }

    if (!currentDestination) {
      alert('请先设置终点')
      return
    }

    const driving = drivingRef.current

    if (!driving) {
      alert('路线规划还没有初始化完成')
      return
    }

    const start: LngLat = currentDriverPosition
    const end: LngLat = [
      currentDestination.longitude,
      currentDestination.latitude,
    ]
    const waypointPositions: Array<LngLat> = currentWaypoints.map(
      item => item.location
    )

    driving.clear()

    driving.search(
      start,
      end,
      {
        waypoints: waypointPositions,
      },
      (status, result) => {
        const data = {
          status,
          result,
        }

        console.log('路线规划结果:', data)
      }
    )
  }

  const lastHotspotClickAtRef = useRef(0)

  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: props.securityCode,
    }

    window.__amapAction = {
      setPickedAsWaypoint: () => {
        const picked = pickedLocationRef.current
        if (!picked) return
        addWaypointByLocation(picked)
      },
      setPickedAsDestination: () => {
        const picked = pickedLocationRef.current
        if (!picked) return
        setDestinationByLocation(picked)
      },
      startRouteByPicked: () => {
        const picked = pickedLocationRef.current
        if (!picked) return
        setDestinationByLocation(picked)
        setTimeout(handlePlanRoute, 0)
      },
      startRoute: () => {
        handlePlanRoute()
      },
    }

    let destroyed = false

    const initMap = async () => {
      const { default: AMapLoader } = await import('@amap/amap-jsapi-loader')

      const AMapInstance = await AMapLoader.load({
        key: props.aKey,
        version,
        plugins: [
          'AMap.Scale',
          'AMap.ToolBar',
          'AMap.HawkEye',
          'AMap.ControlBar',
          'AMap.Geolocation',
          'AMap.Geocoder',
          'AMap.PlaceSearch',
          'AMap.AutoComplete',
          'AMap.Driving',
        ],
      })

      if (destroyed) return

      const AMapTyped = AMapInstance as ConfigAMapWithDriving
      AMapRef.current = AMapTyped

      const map = new AMapTyped.Map('container', {
        zoom: 15,
        viewMode: '3D',
        terrain: true,
        isHotspot: true,
        center: props.center,
      })

      mapRef.current = map

      setContextValue({
        map,
        AMap: AMapTyped,
        openInfoWindow,
      })

      infoWindowRef.current = new AMapTyped.InfoWindow({
        offset: [0, -30],
        isCustom: true,
      })

      geocoderRef.current = new AMapTyped.Geocoder()

      placeSearchRef.current = new AMapTyped.PlaceSearch({
        city: '全国',
        pageSize: 20,
        pageIndex: 1,
      })

      autoCompleteRef.current = new AMapTyped.AutoComplete({
        city: '全国',
        citylimit: false,
      })

      drivingRef.current = new AMapTyped.Driving({
        map,
        panel: 'route-panel',
        policy: drivingPolicy,
      })

      if (navigator.geolocation) {
        driverWatchIdRef.current = navigator.geolocation.watchPosition(
          position => {
            const nextPosition: LngLat = [
              position.coords.longitude,
              position.coords.latitude,
            ]

            setDriverPosition(nextPosition)
          },
          error => {
            console.warn('司机定位监听失败:', error)
          },
          {
            enableHighAccuracy: false,
            maximumAge: 30000,
            timeout: 20000,
          }
        )
      }

      map.on('hotspotclick', event => {
        lastHotspotClickAtRef.current = Date.now()

        const position: LngLat = [event.lnglat.lng, event.lnglat.lat]

        handlePickMapPoint(position, {
          id: event.id,
          name: event.name,
        })
      })

      map.on('click', event => {
        if (Date.now() - lastHotspotClickAtRef.current < 100) return

        const position: LngLat = [event.lnglat.lng, event.lnglat.lat]

        handlePickMapPoint(position)
      })
    }

    initMap()

    return () => {
      destroyed = true

      if (driverWatchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(driverWatchIdRef.current)
      }

      drivingRef.current?.clear()
      mapRef.current?.destroy()

      AMapRef.current = null
      mapRef.current = null
      infoWindowRef.current = null
      geocoderRef.current = null
      placeSearchRef.current = null
      autoCompleteRef.current = null
      drivingRef.current = null
      driverWatchIdRef.current = null

      delete window.__amapAction
    }
  }, [])

  const hasGeolocation = Children.toArray(props.children).some(child => {
    return isValidElement(child) && child.type === Geolocation
  })

  return (
    <AMapContext.Provider value={contextValue}>
      <div className="relative w-full h-full">
        {props.children}

        <DriverMaker position={driverPosition} />
        <PickedMaker location={pickedLocation} />
        <DestinationMaker location={destination} />

        {waypoints.map((item, index) => (
          <WaypointMaker
            key={`${item.id}-${index}`}
            poiItem={item}
            index={index}
          />
        ))}

        <div className="absolute top-5 left-5 z-999 w-120 p-3 rounded-lg shadow-sm bg-white">
          <Search
            value={keyword}
            list={poiList}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSearch()
            }}
            onSelect={poi => {
              handleSelectPoiAsPick(poi, true)
              setPoiList([])
            }}
          />
          {hasGeolocation && (
            <>
              <div className="flex gap-2 mt-2 flex-wrap">
                {drivingPolicyList.map(item => (
                  <Button
                    key={item.value}
                    onClick={() => setDrivingPolicy(item.value)}
                    semanticColor={EnumSemanticColor.DARK}
                    variant={
                      drivingPolicy === item.value
                        ? EnumVariant.SOLID
                        : EnumVariant.OUTLINE
                    }
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                <button onClick={handlePlanRoute}>规划驾车路线</button>

                <button onClick={handleExitRoute}>退出路线规划</button>

                <button onClick={handleClearRoute}>清空路线</button>
              </div>

              {driverPosition && (
                <div className="mt-2 text-sm text-gray-500">
                  司机位置：{driverPosition[0]}, {driverPosition[1]}
                </div>
              )}
            </>
          )}
          {pickedLocation && (
            <>
              <Separator className="my-4" />
              <Title className="mb-1">当前点选位置</Title>
              <LocationCard location={pickedLocation} />
            </>
          )}
          {destination && (
            <>
              <Separator className="my-2" />
              <Title className="mt-b">终点位置</Title>
              <LocationCard location={destination} />
            </>
          )}
          <WaypointList
            waypoints={waypoints}
            onRemove={handleRemoveWaypoint}
            onDragStart={handleDragStartWaypoint}
            onDragOver={handleDragOverWaypoint}
            onDrop={handleDropWaypoint}
          />
          <div id="route-panel" className="text-sm overflow-auto max-h-55" />
        </div>

        <div id="container" className="w-full h-full" />
      </div>
    </AMapContext.Provider>
  )
}

export const AMap = Object.assign(AMapBase, {
  ControlBar,
  Scale,
  ToolBar,
  HawkEye,
  Marker,
  Geolocation,
})
