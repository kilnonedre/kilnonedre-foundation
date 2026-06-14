import { UUID } from '@/type'
import { ConfigApiRespT } from '@/type/api'

export interface MediaItem {
  id: string
  uploadId?: string
  localUrl?: string
  url?: string
  uploading: boolean
}

interface ConfigUploaderProp {
  className?: string
  disabled?: boolean
  readonly?: boolean
  maxSizeKb?: number
  urlTemplate?: string

  upload: (_formData: FormData) => Promise<ConfigApiRespT<{ id: UUID }>>
  onError?: (_message: string) => void
}

export interface ConfigBaseProp extends ConfigUploaderProp {
  value?: Array<UUID>
  onChange?: (_ids: Array<UUID>) => void
  multiple?: boolean
}

export interface ConfigMultiProp extends ConfigUploaderProp {
  value?: Array<UUID>
  onChange?: (_ids: string[]) => void
}

export interface ConfigSingleProp extends ConfigUploaderProp {
  value?: UUID
  onChange?: (_id: UUID) => void
}
