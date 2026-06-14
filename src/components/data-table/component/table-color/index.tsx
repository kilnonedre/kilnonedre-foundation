import type * as types from './type'

export const TableColor = (props: types.ConfigProp) => {
  const color = props.color?.trim()

  if (!color) return null

  return (
    <div
      style={{ backgroundColor: color }}
      className="aspect-square rounded-full"
    />
  )
}
