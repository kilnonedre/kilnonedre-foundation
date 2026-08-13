import { CSSProperties } from 'react'
import { ClassValue } from 'clsx'

export interface ConfigProp {
  key?: string
  day?: string
  bgColor?: ClassValue
  textColor?: ClassValue
  style?: CSSProperties
}
