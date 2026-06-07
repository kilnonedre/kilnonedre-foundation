import { DragEvent, ReactNode } from 'react'
import { EnumElementType } from '@/view/demo/print/type'

export interface ConfigProp {
  type: EnumElementType
  children: ReactNode
  onDragStart: (
    _event: DragEvent<HTMLDivElement>,
    _type: EnumElementType
  ) => void
}
