import { ReactNode } from 'react'

export interface ConfigProp {
  open: boolean
  onOpenChange: (_open: boolean) => void
  title?: string
  content?: ReactNode
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void | Promise<void>
}
