import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/select'
import type * as types from './type'

export const FormSelect = (props: types.ConfigProp) => {
  return (
    <Select
      value={props.value}
      onValueChange={val => {
        props.onValueChange(val)
        if (!props.onLabelChange) return
        const filter = props.optionList.find(option => option.value === val)
        if (!filter) return
        props.onLabelChange(filter.label)
      }}
      aria-invalid={props.invalid}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.optionList.map(option => {
            return (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
