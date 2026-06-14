import { ChangeEventHandler, KeyboardEventHandler } from 'react'

export interface ConfigProp {
  value?: string
  list: Array<AMap.ConfigPoi>
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  onSelect?: (item: AMap.ConfigPoi) => void
}
