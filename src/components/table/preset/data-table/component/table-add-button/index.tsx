import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/button'
import { EnumVariant } from '@/type'
import type * as types from './type'

export const TableAddButton = (props: types.ConfigProp) => {
  return (
    <Button
      variant={EnumVariant.OUTLINE}
      size="sm"
      type="button"
      onClick={props.onClick}
    >
      <PlusIcon />
      <span className="hidden lg:inline text-sm">{props.label ?? '添加'}</span>
    </Button>
  )
}
