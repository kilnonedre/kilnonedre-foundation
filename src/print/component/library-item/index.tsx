import { Button } from '@/components'
import { EnumSemanticColor, EnumVariant } from '@/type'
import type * as types from './type'

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
