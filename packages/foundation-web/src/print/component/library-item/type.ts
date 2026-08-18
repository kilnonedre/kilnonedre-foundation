import { EnumElementType } from '@/print/type'
import { DragEvent, ReactNode } from 'react'

export interface ConfigProp {
  type: EnumElementType
  children: ReactNode
  onDragStart: (
    _event: DragEvent<HTMLDivElement>,
    _type: EnumElementType
  ) => void
}
