import { Card } from '@/components'
import type * as types from './type'

const LocationCard = (props: types.ConfigProp) => {
  const address = [
    props.location.province,
    props.location.city,
    props.location.district,
  ].join(' ')

  return (
    <Card>
      <div className="text-sm">{address}</div>
      <div>{props.location.poiName}</div>
      <div className="text-sm">
        {props.location.longitude} {props.location.latitude}
      </div>
    </Card>
  )
}

export default LocationCard
