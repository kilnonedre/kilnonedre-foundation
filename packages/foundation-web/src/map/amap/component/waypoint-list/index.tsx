import { Title } from '@/components'
import { Separator } from '@/shadcn/components/separator'
import type * as types from './type'

export const WaypointList = (props: types.ConfigProp) => {
  if (props.waypoints.length === 0) {
    return null
  }
  return (
    <>
      <Separator className="my-4" />
      <Title className="mb-1">途经点，可拖拽排序</Title>
      <div className="mt-2 max-h-40 overflow-auto rounded-md">
        {props.waypoints.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            draggable
            onDragStart={() => props.onDragStart(index)}
            onDragOver={props.onDragOver}
            onDrop={() => props.onDrop(index)}
            className="flex justify-between align-middle gap-2 p-2 text-sm cursor-move border-b border-gray-200"
          >
            <span>
              {index + 1}. {item.name}
            </span>

            <button onClick={() => props.onRemove(item.id)}>删除</button>
          </div>
        ))}
      </div>
    </>
  )
}
