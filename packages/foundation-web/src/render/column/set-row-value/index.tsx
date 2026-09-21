import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'

export const setRowValue = <
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues>,
>(
  form: UseFormReturn<TFieldValues>,
  field: TFieldName,
  value: FieldPathValue<TFieldValues, TFieldName>
) => {
  form.setValue(field, value, {
    shouldDirty: true,
  })
}
