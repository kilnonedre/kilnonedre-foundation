import { Badge } from '@/components/badge'
import type * as types from './type'
import { boolToText, EnumSemanticColor } from '@kilnonedre/foundation'

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
