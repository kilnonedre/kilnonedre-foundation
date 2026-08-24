import { mockValueByType } from '@/print/enum/type'
import { ConfigField } from '@/print/type/element'

export const SNAP_DISTANCE = 5

export const createMockData = <T>(
  fields: Array<ConfigField>,
  columns: Array<ConfigField>
): T => {
  const data: Record<string, unknown> = {}

  fields.forEach(field => {
    data[field.field] = mockValueByType(field.type)
  })

  data.items = Array.from({ length: 3 }, () => {
    const row: Record<string, unknown> = {}

    columns.forEach(column => {
      row[column.field] = mockValueByType(column.type)
    })

    return row
  })

  return data as T
}

export const createInjectedData = <T>(
  fields: Array<ConfigField>,
  columns: Array<ConfigField>,
  rowCount = 40
): T => {
  const data: Record<string, unknown> = {}

  fields.forEach(field => {
    data[field.field] = mockValueByType(field.type)
  })

  data.items = Array.from({ length: rowCount }, () => {
    const row: Record<string, unknown> = {}

    columns.forEach(column => {
      row[column.field] = mockValueByType(column.type)
    })

    return row
  })

  return data as T
}
