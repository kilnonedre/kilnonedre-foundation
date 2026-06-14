import { FieldValues } from 'react-hook-form'
import { ConfigRenderBase } from '@/render/form/type'
import { CommonLocation, LngLat } from '@/type'

export interface ConfigProp<T extends FieldValues>
  extends ConfigRenderBase<T>, ConfigMapDialogBodyProp {}

export interface ConfigMapDialogBodyProp {
  aKey: string
  securityCode: string
  center?: LngLat
  value?: CommonLocation | null
  onConfirm?: (location: CommonLocation | null) => void
}
