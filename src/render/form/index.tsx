import { ReactNode } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Button, FieldGroup } from '@/components'
import { FormTextarea } from '@/render/form/form-textarea'
import { DialogClose, DialogFooter } from '@/shadcn/components/dialog'
import { EnumFormMode, EnumSemanticColor, EnumVariant } from '@/type'

export * from './form-checkbox'
export * from './form-color'
export * from './form-enum-select'
export * from './form-input'
export * from './form-map-select'
export * from './form-password'
export * from './form-switch'
export * from './form-textarea'
export * from './form-time-picker'
export * from './type'

export const getSuccessMessage = (mode: EnumFormMode) => {
  switch (mode) {
    case EnumFormMode.CREATE:
      return '创建成功'

    case EnumFormMode.UPDATE:
      return '更新成功'

    case EnumFormMode.DELETE:
      return '删除成功'

    case EnumFormMode.VIEW:
      return ''
  }
}

export const renderFooter = (mode: EnumFormMode) => {
  switch (mode) {
    case EnumFormMode.VIEW:
      return (
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={EnumVariant.OUTLINE}>关闭</Button>
          </DialogClose>
        </DialogFooter>
      )

    case EnumFormMode.DELETE:
      return (
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={EnumVariant.OUTLINE}>取消</Button>
          </DialogClose>
          <Button semanticColor={EnumSemanticColor.DANGER} type="submit">
            确认删除
          </Button>
        </DialogFooter>
      )

    default:
      return (
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={EnumVariant.OUTLINE}>取消</Button>
          </DialogClose>
          <Button semanticColor={EnumSemanticColor.DARK} type="submit">
            保存
          </Button>
        </DialogFooter>
      )
  }
}

export const renderLayoutFooter = (
  mode: EnumFormMode,
  onSubmit: () => void
) => {
  switch (mode) {
    case EnumFormMode.VIEW:
    case EnumFormMode.DELETE:
      return null

    default:
      return (
        <div className="flex justify-end gap-2">
          <Button variant={EnumVariant.OUTLINE}>取消</Button>
          <Button semanticColor={EnumSemanticColor.DARK} onClick={onSubmit}>
            保存
          </Button>
        </div>
      )
  }
}

export const renderConfirmFooter = () => {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant={EnumVariant.OUTLINE}>取消</Button>
      </DialogClose>
      <Button type="submit">确定</Button>
    </DialogFooter>
  )
}

export const renderBody = <T extends FieldValues>(
  mode: EnumFormMode,
  formFields: () => ReactNode,
  form: UseFormReturn<T>
) => {
  switch (mode) {
    case EnumFormMode.DELETE:
      return (
        <FieldGroup singleColumn>
          <FormTextarea
            mode={mode}
            form={form}
            id="updatedReason"
            name={'updatedReason' as Path<T>}
            label="删除原因"
          />
        </FieldGroup>
      )

    default:
      return formFields()
  }
}
