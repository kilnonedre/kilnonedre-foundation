export interface ConfigProp {
  waypoints: Array<AMap.ConfigPoi>
  onRemove: (id: string) => void
  onDragStart: (index: number) => void
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  onDrop: (index: number) => void
}
