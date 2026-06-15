import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { TableFormDialog } from '@/components/data-table/component/table-form-dialog'
import { FieldGroup } from '@/components/field-group'
import {
  FormTextareaUpdatedReason,
  getSuccessMessage,
  renderBody,
  renderFooter,
} from '@/render'
import { EnumFormMode } from '@/type'
import {
  FormValues,
  FormValuesInput,
  getDefaultValues,
  schema,
} from './index.schema'
import type * as types from './type'

export const TableDeleteFormDialog = (props: types.ConfigProp) => {
  const mode = EnumFormMode.DELETE
  const [open, setOpen] = useState(false)

  const resolver = useMemo(
    () => zodResolver<FormValuesInput, unknown, FormValues>(schema),
    []
  )

  const form = useForm<FormValuesInput, unknown, FormValues>({
    resolver,
    defaultValues: getDefaultValues(),
    mode: 'onSubmit',
  })

  const resetByMode = () => {
    form.reset(getDefaultValues())
  }

  const submitByMode = async (values: FormValues) => {
    return await props.onDelete(props.id!, {
      updatedReason: values.updatedReason,
    })
  }

  const onSubmit = async (values: FormValues) => {
    try {
      const resp = await submitByMode(values)
      if (resp.code !== '200') {
        toast.error(resp.msg || '操作失败')
        return
      }
      toast.success(getSuccessMessage(EnumFormMode.DELETE))
      resetByMode()
      setOpen(false)
      props.onEdit()
    } catch (e) {
      console.error(e)
      toast.error('系统错误')
    }
  }

  const formFields = () => (
    <FieldGroup singleColumn>
      <FormTextareaUpdatedReason mode={mode} form={form} />
    </FieldGroup>
  )

  const onOpenChange = async (nextOpen: boolean) => {
    if (nextOpen) {
      setOpen(true)
      resetByMode()
      return
    }
    setOpen(nextOpen)
  }

  return (
    <TableFormDialog
      id={props.id}
      mode={mode}
      open={open}
      onEdit={props.onEdit}
      limitHeight={false}
      renderBody={() => renderBody(mode, formFields, form)}
      renderFooter={() => renderFooter(mode)}
      onSubmit={form.handleSubmit(onSubmit)}
      onOpenChange={onOpenChange}
    >
      {props.children}
    </TableFormDialog>
  )
}
