import { ConfigProp } from '@/print/component/tab/type'
import { ConfigField, ConfigFieldElement } from '@/print/type/element'
import { UUID } from '@kilnonedre/foundation'

export interface ConfigFieldProp extends ConfigProp {
  element: ConfigFieldElement
  fields: Array<ConfigField>
  updateFieldElement: (
    id: UUID,
    patch: Partial<ConfigFieldElement['props']>
  ) => void
}
