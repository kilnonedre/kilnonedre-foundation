import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shadcn/components/input-group'
import type * as types from './type'

const Search = (props: types.ConfigProp) => {
  const [focused, setFocused] = useState(false)

  const showDropdown = focused && props.list.length > 0

  return (
    <div className="relative w-full">
      <InputGroup>
        <InputGroupInput
          placeholder="搜索位置，例如：浙江省"
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setTimeout(() => setFocused(false), 150)
          }}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
        />

        <InputGroupAddon>
          <SearchIcon className="size-4" />
        </InputGroupAddon>
      </InputGroup>

      {showDropdown && (
        <div className="absolute top-full left-0 z-50 mt-1 max-h-50 w-full overflow-auto rounded-md border bg-background shadow-md">
          {props.list.map((item, index) => (
            <div
              key={item.id || index}
              className="cursor-pointer px-3 py-2 hover:bg-muted"
              onMouseDown={event => {
                event.preventDefault()
                props.onSelect?.(item)
              }}
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-muted-foreground text-sm">
                {item.address || '暂无地址'}
              </div>
              <div className="text-muted-foreground text-xs">
                {item.location[0]}, {item.location[1]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
