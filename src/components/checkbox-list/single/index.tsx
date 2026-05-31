import { Checkbox } from '@/shadcn/components/checkbox'
import type * as types from './type'

export const CheckboxSingleList = (props: types.ConfigProp) => {
  return (
    <div className="flex gap-4">
      {props.options.map(opt => (
        <label key={opt.value} className="flex items-center gap-2">
          <Checkbox
            checked={props.value === opt.value}
            onCheckedChange={() => {
              if (props.value === opt.value) {
                props.onChange('')
              } else {
                props.onChange(opt.value)
              }
            }}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  )
}
