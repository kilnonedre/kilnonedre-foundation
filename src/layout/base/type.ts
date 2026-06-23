import { ReactNode } from 'react'

export interface ConfigBaseLayoutRootProp {
  children: ReactNode
  footer?: ReactNode
}

export interface ConfigBaseLayoutTitleProp {
  children: ReactNode
}

export interface ConfigBaseLayoutSectionProp {
  title?: ReactNode
  children: ReactNode
}
