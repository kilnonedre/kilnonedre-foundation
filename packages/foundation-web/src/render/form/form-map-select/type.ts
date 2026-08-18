import { Dispatch, SetStateAction } from 'react'
import { FieldValues } from 'react-hook-form'
import { ConfigRenderBase } from '@/render/form/type'
import { CommonLocation, LngLat } from '@kilnonedre/foundation'

export interface ConfigProp<T extends FieldValues>
  extends ConfigRenderBase<T>, ConfigMapDialogBodyProp {}

export interface ConfigMapDialogProp {
  aKey: string
  securityCode: string
  id?: string
  value?: CommonLocation | null
  center?: LngLat
  invalid?: boolean | null
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onConfirm?: (location: CommonLocation | null) => void
}

export interface ConfigMapDialogBodyProp {
  aKey: string
  securityCode: string
  center?: LngLat
  value?: CommonLocation | null
  onConfirm?: (location: CommonLocation | null) => void
  onCancel?: () => void
}
