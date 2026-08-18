import { CommonOption } from '@kilnonedre/foundation'

export interface ConfigProp {
  options: Array<CommonOption>
  value?: string | null
  onChange: (_v: string) => void
}
