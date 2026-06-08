import { FieldValues } from 'react-hook-form'
import { FormEnumSelect } from '@/render/form/form-enum-select'
import { ConfigFormEnumSelect } from '@/render/form/form-enum-select/preset/type'
import { enumGenderTypeOptions } from '@/type'

export const FormEnumSelectGender = <T extends FieldValues>(
  props: ConfigFormEnumSelect<T>
) => <FormEnumSelect {...props} options={enumGenderTypeOptions} />
