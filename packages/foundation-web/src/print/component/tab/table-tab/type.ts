import { ConfigProp } from '@/print/component/tab/type'
import { ConfigField, ConfigTableElement } from '@/print/type/element'
import { UUID } from '@kilnonedre/foundation'

export interface ConfigTableProp extends ConfigProp {
  element: ConfigTableElement
  columns: Array<ConfigField>
  updateFieldElement: (
    id: UUID,
    patch: Partial<ConfigTableElement['props']>
  ) => void
}
