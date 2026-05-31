import { ReactNode } from 'react'

export interface ConfigProp {
  children: ReactNode
  title?: string
  content?: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
}
