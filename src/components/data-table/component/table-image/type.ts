import { UUID } from '@/type'

export interface ConfigProp {
  ids?: Array<UUID>
  urls?: Array<string>
  urlTemplate?: string
}
