import { ConfigElement } from '@/print/type/element'
import { UUID } from '@kilnonedre/foundation'

export interface ConfigProp {
  element: ConfigElement
  updateElement: (id: UUID, patch: Partial<ConfigElement>) => void
  updateElementProps: (id: UUID, patch: Partial<ConfigElement['props']>) => void
}
