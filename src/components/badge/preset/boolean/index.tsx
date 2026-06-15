import { Badge } from '@/components/badge'
import { EnumSemanticColor } from '@/type'
import { boolToText } from '@/util'
import type * as types from './type'

export const BadgeBoolean = (props: types.ConfigProp) => {
  return (
    <Badge
      semanticColor={
        props.bool ? EnumSemanticColor.SUCCESS : EnumSemanticColor.DANGER
      }
    >
      {boolToText(props.bool)}
    </Badge>
  )
}
