import { ChangeEventHandler, KeyboardEventHandler } from 'react'
import { ConfigPoiItem } from '@/type'

export interface ConfigProp {
  value?: string
  list: Array<ConfigPoiItem>
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  onSelect?: (item: ConfigPoiItem) => void
}
