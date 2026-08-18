import { FieldValues, Path } from 'react-hook-form'
import { FormTextarea } from '@/render/form/form-textarea'
import type * as types from './type'

export const FormTextareaUpdatedReason = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  return (
    <FormTextarea
      mode={props.mode}
      form={props.form}
      id="updatedReason"
      name={'updatedReason' as Path<T>}
      label="更新原因"
    />
  )
}
