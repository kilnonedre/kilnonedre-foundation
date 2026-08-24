import { ConfigField } from '@/print/type/element'

export interface ConfigProp {
  fields: Array<ConfigField>
  onSelect: (_field: ConfigField) => void
}

export interface ConfigBaseProp extends ConfigProp {
  isChecked: (_field: ConfigField) => boolean
}

export interface ConfigSingleProp extends ConfigProp {
  selectedField: ConfigField
}

export interface ConfigMultiProp extends ConfigProp {
  selectedFields: Array<ConfigField>
}
