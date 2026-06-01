import { CommonObject, UUID } from '@/type'
import { ConfigApiRespT } from '@/type/api'

export interface MediaItem {
  id: string // local id for react key
  uploadId?: string // 后端 object id（表单 value 的元素）
  localUrl?: string // 上传前/上传中预览
  url?: string // ReadObject 或 CreateObject 返回的 url
  uploading: boolean
}

export interface ConfigProps {
  value?: Array<UUID>
  onChange?: (_ids: string[]) => void
  className?: string
  disabled?: boolean
  multiple?: boolean
  readonly?: boolean
  maxSizeKb?: number
  upload: (_formData: FormData) => Promise<ConfigApiRespT<CommonObject>>
  read: (_id: UUID) => Promise<ConfigApiRespT<CommonObject>>
  onError?: (_message: string) => void
}
