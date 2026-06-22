import { PlusIcon } from 'lucide-react'
import { Button } from '@/shadcn/components/button'
import type * as types from './type'

export const TableAddButton = (props: types.ConfigProp) => {
  return (
    <Button variant="outline" size="sm" onClick={props.onClick}>
      <PlusIcon />
      <span className="hidden lg:inline text-sm">{props.label ?? '添加'}</span>
    </Button>
  )
}
