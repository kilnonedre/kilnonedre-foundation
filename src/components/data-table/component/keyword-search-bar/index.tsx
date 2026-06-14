import { Button } from '@/shadcn/components/button'
import { Input } from '@/shadcn/components/input'
import type * as types from './type'

export const KeywordSearchBar = (props: types.ConfigProp) => {
  return (
    <>
      <Input
        className={props.widthClassName ?? 'w-65'}
        placeholder={props.placeholder ?? '请输入关键字'}
        value={props.value ?? ''}
        onChange={e => props.onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            props.onSearch()
          }
        }}
      />

      <Button size="sm" onClick={props.onSearch}>
        查询
      </Button>
    </>
  )
}
