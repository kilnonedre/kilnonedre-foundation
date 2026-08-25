import { CSSProperties, MouseEventHandler } from 'react'

export interface ConfigProp {
  key?: string
  day?: string
  className?: string
  dayClassName?: string
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLDivElement>
}
