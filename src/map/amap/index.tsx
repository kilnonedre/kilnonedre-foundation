/* eslint-disable complexity */
import { DragEvent, useEffect, useRef, useState } from 'react'
import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Title } from '@/components'
import LocationCard from '@/map/amap/component/location-card'
import Search from '@/map/amap/component/search'
import { drivingPolicyList } from '@/map/amap/data'
import { createMarkerIcon } from '@/map/amap/util'
import { Separator } from '@/shadcn/components/separator'
import {
  CommonLocation,
  ConfigAMapWithDriving,
  ConfigAutoCompleteTip,
  ConfigDrivingInstance,
  ConfigPoiItem,
  EnumMarkerType,
  EnumSemanticColor,
  EnumVariant,
  LngLat,
} from '@/type'
import { normalizeKeyword } from '@/util'
import type * as types from './type'

export const AMap = ({ version = '2.0', ...props }: types.ConfigProp) => {
  const mapRef = useRef<AMap.Map | null>(null)
  const AMapRef = useRef<ConfigAMapWithDriving | null>(null)

  const pickMarkerRef = useRef<AMap.Marker | null>(null)
  const destinationMarkerRef = useRef<AMap.Marker | null>(null)
  const driverMarkerRef = useRef<AMap.Marker | null>(null)
  const waypointMarkerListRef = useRef<AMap.Marker[]>([])
  const infoWindowRef = useRef<AMap.InfoWindow | null>(null)

  const geocoderRef = useRef<AMap.Geocoder | null>(null)
  const placeSearchRef = useRef<AMap.PlaceSearch | null>(null)
  const autoCompleteRef = useRef<AMap.AutoComplete | null>(null)
  const drivingRef = useRef<ConfigDrivingInstance | null>(null)
  const driverWatchIdRef = useRef<number | null>(null)

  const pickedLocationRef = useRef<CommonLocation | null>(null)
  const destinationRef = useRef<CommonLocation | null>(null)
  const waypointsRef = useRef<Array<ConfigPoiItem>>([])
  const driverPositionRef = useRef<LngLat | null>(null)
  const draggedWaypointIndexRef = useRef<number | null>(null)

  const [keyword, setKeyword] = useState('')
  const [poiList, setPoiList] = useState<Array<ConfigPoiItem>>([])
  const [driverPosition, setDriverPosition] = useState<LngLat | null>(null)
  const [pickedLocation, setPickedLocation] = useState<CommonLocation | null>(
    null
  )
  const [destination, setDestination] = useState<CommonLocation | null>(null)
  const [waypoints, setWaypoints] = useState<Array<ConfigPoiItem>>([])
  const [drivingPolicy, setDrivingPolicy] = useState<number>(
    drivingPolicyList[0].value
  )

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
    body: string
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
        <div style="margin-top:6px;">${params.body}</div>
        ${
          params.actions
            ? `<div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">${params.actions}</div>`
            : ''
        }
      </div>
    `)

    infoWindow.open(map, params.position)
  }

  const createMarker = (params: {
    position: LngLat
    type: EnumMarkerType
    title: string
    body: string
    actions?: string
    onClick?: () => void
  }) => {
    const map = mapRef.current
    const AMapTyped = AMapRef.current

    if (!map || !AMapTyped) return null

    const marker = new AMapTyped.Marker({
      map,
      position: params.position,
      icon: createMarkerIcon(AMapTyped, params.type),
      offset: [-13, -30],
      title: params.title,
    })

    marker.on('click', () => {
      if (params.onClick) {
        params.onClick()
        return
      }

      openInfoWindow({
        position: params.position,
        title: params.title,
        body: params.body,
        actions: params.actions,
      })
    })

    return marker
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

  useEffect(() => {
    const map = mapRef.current

    if (!map) return

    waypointMarkerListRef.current.forEach(marker => {
      map.remove(marker)
    })

    waypointMarkerListRef.current = waypoints
      .map((item, index) => {
        return createMarker({
          position: item.location,
          type: EnumMarkerType.WAYPOINT,
          title: `途经点 ${index + 1}`,
          body: `
            <div>${item.name}</div>
            <div>${item.address}</div>
            <div>经度：${item.location[0]}</div>
            <div>纬度：${item.location[1]}</div>
          `,
          actions: `
            <button onclick="window.__amapAction?.startRoute()">重新规划</button>
          `,
        })
      })
      .filter((item): item is AMap.Marker => Boolean(item))
  }, [waypoints])

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

        if (pickMarkerRef.current) {
          map.remove(pickMarkerRef.current)
          pickMarkerRef.current = null
        }

        pickMarkerRef.current = createMarker({
          position,
          type: EnumMarkerType.PICKED,
          title: '点选位置',
          body: `
          <div>${data.poiName || data.address}</div>
          <div>经度：${data.longitude}</div>
          <div>纬度：${data.latitude}</div>
        `,
          actions: `
          <button onclick="window.__amapAction?.setPickedAsWaypoint()">设为途经点</button>
          <button onclick="window.__amapAction?.setPickedAsDestination()">设为终点</button>
          <button onclick="window.__amapAction?.startRouteByPicked()">导航</button>
        `,
        })
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

    const position: LngLat = [location.longitude, location.latitude]

    if (destinationMarkerRef.current) {
      map.remove(destinationMarkerRef.current)
      destinationMarkerRef.current = null
    }

    destinationMarkerRef.current = createMarker({
      position,
      type: EnumMarkerType.DESTINATION,
      title: '终点',
      body: `
        <div>${location.poiName || location.address}</div>
        <div>经度：${location.longitude}</div>
        <div>纬度：${location.latitude}</div>
        <div>省：${location.province}</div>
        <div>市：${location.city}</div>
        <div>区：${location.district}</div>
      `,
      actions: `
        <button onclick="window.__amapAction?.startRoute()">导航</button>
      `,
    })

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

    const waypoint: ConfigPoiItem = {
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
      pois: Array<{
        id?: string
        name?: string
        address?: string
        distance?: number
        location?: {
          lng?: number
          lat?: number
        }
      }>
    ): Array<ConfigPoiItem> => {
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

          const tips = (autoResult.tips ?? []) as Array<ConfigAutoCompleteTip>

          const list: Array<ConfigPoiItem> = tips
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

      const list: Array<ConfigPoiItem> = tips
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

  const handleSelectPoiAsPick = (poi: ConfigPoiItem, moveCenter = false) => {
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
    const map = mapRef.current

    setWaypoints([])
    setDestination(null)

    drivingRef.current?.clear()

    const panel = document.getElementById('route-panel')
    if (panel) {
      panel.innerHTML = ''
    }

    waypointMarkerListRef.current.forEach(marker => {
      map?.remove(marker)
    })
    waypointMarkerListRef.current = []

    if (map && destinationMarkerRef.current) {
      map.remove(destinationMarkerRef.current)
      destinationMarkerRef.current = null
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

    console.log('路线规划入参:', {
      policy: drivingPolicy,
      start,
      end,
      waypoints: waypointPositions,
    })

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

    AMapLoader.load({
      key: props.key,
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
    }).then(AMapInstance => {
      if (destroyed) return

      const AMapTyped = AMapInstance as ConfigAMapWithDriving
      AMapRef.current = AMapTyped

      const map = new AMapTyped.Map('container', {
        zoom: 15,
        viewMode: '3D',
        terrain: true,
      })

      mapRef.current = map

      map.addControl(new AMapTyped.Scale())
      map.addControl(
        new AMapTyped.ToolBar({
          position: 'RB',
          offset: [20, 60],
        })
      )
      map.addControl(new AMapTyped.HawkEye({ isOpen: false }))
      map.addControl(
        new AMapTyped.ControlBar({
          position: 'RT',
        })
      )

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

      const geolocation = new AMapTyped.Geolocation({
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 60000,
        convert: true,
        showButton: true,
        showMarker: true,
        showCircle: true,
        zoomToAccuracy: true,
        position: 'RB',
        offset: [18, 20],
      })

      map.addControl(geolocation)

      geolocation.getCurrentPosition((status, result) => {
        if (!result || !result.position) {
          return
        }
        const position: LngLat =
          status === 'complete'
            ? [result.position.lng, result.position.lat]
            : [116.397428, 39.90923]

        setDriverPosition(position)
        map.setCenter(position)

        driverMarkerRef.current = createMarker({
          position,
          type: EnumMarkerType.DRIVER,
          title: '司机位置',
          body: `
            <div>经度：${position[0]}</div>
            <div>纬度：${position[1]}</div>
            <div>${
              status === 'complete' ? '定位成功' : '定位失败，当前为默认位置'
            }</div>
          `,
          actions: `
            <button onclick="window.__amapAction?.startRoute()">从司机位置导航</button>
          `,
        })

        if (status === 'complete') {
          console.log('司机当前位置:', position)
        } else {
          console.warn('定位失败，使用默认位置:', result)
        }
      })

      geolocation.on('complete', result => {
        const lng = result?.position?.lng
        const lat = result?.position?.lat
        if (typeof lng !== 'number' || typeof lat !== 'number') return
        const position: LngLat = [lng, lat]
        setDriverPosition(position)
        map.setCenter(position)
        map.setZoom(17)
        driverMarkerRef.current?.setPosition(position)
        console.log('定位成功:', position)
      })

      if (navigator.geolocation) {
        driverWatchIdRef.current = navigator.geolocation.watchPosition(
          position => {
            const nextPosition: LngLat = [
              position.coords.longitude,
              position.coords.latitude,
            ]

            setDriverPosition(nextPosition)

            if (driverMarkerRef.current) {
              driverMarkerRef.current.setPosition(nextPosition)
            }
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

      map.on('click', event => {
        const position: LngLat = [event.lnglat.lng, event.lnglat.lat]
        handlePickMapPoint(position)
      })
    })

    return () => {
      destroyed = true

      if (driverWatchIdRef.current !== null) {
        navigator.geolocation.clearWatch(driverWatchIdRef.current)
      }

      drivingRef.current?.clear()
      mapRef.current?.destroy()

      AMapRef.current = null
      mapRef.current = null
      pickMarkerRef.current = null
      destinationMarkerRef.current = null
      driverMarkerRef.current = null
      waypointMarkerListRef.current = []
      infoWindowRef.current = null
      geocoderRef.current = null
      placeSearchRef.current = null
      autoCompleteRef.current = null
      drivingRef.current = null

      delete window.__amapAction
    }
  }, [])

  return (
    <div className="relative w-full h-full">
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
        {waypoints.length > 0 && (
          <>
            <Separator className="my-4" />
            <Title className="mb-1">途经点，可拖拽排序</Title>
            <div className="mt-2 max-h-40 overflow-auto rounded-md">
              {waypoints.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  draggable
                  onDragStart={() => handleDragStartWaypoint(index)}
                  onDragOver={handleDragOverWaypoint}
                  onDrop={() => handleDropWaypoint(index)}
                  className="flex justify-between align-middle gap-2 p-2 text-sm cursor-move border-b border-gray-200"
                >
                  <span>
                    {index + 1}. {item.name}
                  </span>

                  <button onClick={() => handleRemoveWaypoint(item.id)}>
                    删除
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        <div id="route-panel" className="text-sm overflow-auto max-h-55 mt-2" />
      </div>

      <div id="container" className="w-full h-full" />
    </div>
  )
}
