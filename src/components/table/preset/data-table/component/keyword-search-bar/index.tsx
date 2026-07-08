import { Button } from '@/components/button'
import { Input } from '@/shadcn/components/input'
import { EnumSemanticColor } from '@/type'
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

      <Button
        semanticColor={EnumSemanticColor.DARK}
        size="sm"
        onClick={props.onSearch}
      >
        查询
      </Button>
    </>
  )
}
