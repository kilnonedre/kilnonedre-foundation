import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/button'
import type * as types from './type'
import { EnumVariant } from '@kilnonedre/foundation'

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
