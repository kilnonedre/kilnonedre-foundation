import { Button } from '@/components'
import type * as types from './type'
import { EnumSemanticColor, EnumVariant } from '@kilnonedre/foundation'

const LibraryItem = (props: types.ConfigProp) => {
  return (
    <div draggable onDragStart={event => props.onDragStart(event, props.type)}>
      <Button
        semanticColor={EnumSemanticColor.DARK}
        variant={EnumVariant.OUTLINE}
      >
        {props.children}
      </Button>
    </div>
  )
}

export default LibraryItem
