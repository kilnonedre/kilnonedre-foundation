import { UUID } from '@kilnonedre/foundation'

export interface ConfigProp {
  ids?: Array<UUID>
  urls?: Array<string>
  urlTemplate?: string
}
