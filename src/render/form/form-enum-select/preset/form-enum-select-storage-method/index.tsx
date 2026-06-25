import { FieldValues } from 'react-hook-form'
import { FormEnumSelect } from '@/render/form/form-enum-select'
import { ConfigFormEnumSelect } from '@/render/form/form-enum-select/preset/type'
import { enumStorageMethodOptions } from '@/type'

export const FormEnumSelectStorageMethod = <T extends FieldValues>(
  props: ConfigFormEnumSelect<T>
) => <FormEnumSelect {...props} options={enumStorageMethodOptions} />
