import { v4 as uuidv4 } from 'uuid'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/table'
import { EnumElementType } from '@/print/enum/element-type'
import { UUID } from '@kilnonedre/foundation'
import {
  ConfigCreateElement,
  ConfigElement,
  ConfigTableElement,
} from '@/print/type/element'
import { ConfigPaperSize } from '@/print/type'

export * from './print'

export const createElement = ({
  x = 20,
  y = 20,
  ...payload
}: ConfigCreateElement): ConfigElement => {
  if (payload.type === EnumElementType.TABLE) {
    return {
      id: uuidv4() as UUID,
      type: EnumElementType.TABLE,
      x,
      y,
      width: 170,
      height: 80,
      props: {
        rowHeight: 10,
        fontSize: 16,
        color: '#000000',
        columns: payload.columns,
      },
    }
  } else if (payload.type === EnumElementType.FIELD) {
    return {
      id: uuidv4() as UUID,
      type: EnumElementType.FIELD,
      x,
      y,
      width: 80,
      height: 10,
      props: {
        field: payload.field,
        fontSize: 16,
        color: '#000000',
        textAlign: 'left',
        fontWeight: 'normal',
      },
    }
  } else {
    return {
      id: uuidv4() as UUID,
      type: EnumElementType.TEXT,
      x,
      y,
      width: 80,
      height: 10,
      props: {
        text: '新文本',
        fontSize: 16,
        color: '#000000',
        textAlign: 'left',
        fontWeight: 'normal',
      },
    }
  }
}

const FontElementRenderer = (payload: {
  element: ConfigElement
  text: string | number
  scale: number
}) => {
  if (
    payload.element.type !== EnumElementType.FIELD &&
    payload.element.type !== EnumElementType.TEXT
  ) {
    return
  }
  return (
    <div
      style={{
        fontSize: payload.element.props.fontSize ?? 16,
        color: payload.element.props.color ?? '#000000',
        fontWeight: payload.element.props.fontWeight ?? 'normal',
        textAlign:
          (payload.element.props.textAlign?.toLowerCase() as React.CSSProperties['textAlign']) ??
          'left',
        lineHeight: `${payload.element.height * payload.scale}px`,
      }}
    >
      {payload.text}
    </div>
  )
}

export const ElementRenderer = <T,>(payload: {
  element: ConfigElement
  scale: number
  data: T
}) => {
  if (payload.element.type === EnumElementType.TEXT) {
    return (
      <FontElementRenderer
        element={payload.element}
        text={payload.element.props.text}
        scale={payload.scale}
      />
    )
  } else if (payload.element.type === EnumElementType.FIELD) {
    return (
      <FontElementRenderer
        element={payload.element}
        text={
          (payload.data as Record<string, string | number>)[
            payload.element.props.field.field
          ]
        }
        scale={payload.scale}
      />
    )
  } else if (payload.element.type === EnumElementType.TABLE) {
    const value = (payload.data as unknown as Record<string, unknown>)['items']
    const rows = Array.isArray(value)
      ? (value as Array<Record<string, string | number>>)
      : []
    const columns = payload.element.props.columns ?? []
    const rowHeight = (payload.element.props.rowHeight ?? 10) * payload.scale
    const color = payload.element.props.color ?? '#000000'

    return (
      <>
        <Table
          className="border border-black"
          style={{
            fontSize: payload.element.props.fontSize ?? 16,
            color,
          }}
        >
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead
                  key={column.field}
                  className="border border-black font-bold"
                  style={{
                    width: column.width! * payload.scale,
                    height: rowHeight,
                    color,
                  }}
                >
                  {column.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map(column => (
                  <TableCell
                    key={column.field}
                    className="border border-black"
                    style={{
                      height: rowHeight,
                    }}
                  >
                    {row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )
  }

  return null
}

const FontPrintElementRenderer = (payload: {
  element: ConfigElement
  text: string | number
}) => {
  if (
    payload.element.type !== EnumElementType.FIELD &&
    payload.element.type !== EnumElementType.TEXT
  ) {
    return
  }
  const element = payload.element
  return (
    <div
      style={{
        position: 'absolute',
        left: `${element.x}mm`,
        top: `${element.y}mm`,
        width: `${element.width}mm`,
        height: `${element.height}mm`,
        color: element.props.color ?? '#000000',
        fontSize: element.props.fontSize ?? 16,
        fontWeight: element.props.fontWeight ?? 'normal',
        textAlign:
          (element.props.textAlign?.toLowerCase() as React.CSSProperties['textAlign']) ??
          'left',
        lineHeight: `${element.height}mm`,
        overflow: 'hidden',
      }}
    >
      {payload.text}
    </div>
  )
}

export const PrintElementRenderer = <
  T,
  R extends Record<string, string | number>,
>(payload: {
  element: ConfigElement
  data: T
  getTable: (value: T) => Array<R>
}) => {
  if (payload.element.type === EnumElementType.TEXT) {
    return (
      <FontPrintElementRenderer
        element={payload.element}
        text={payload.element.props.text}
      />
    )
  } else if (payload.element.type === EnumElementType.FIELD) {
    return (
      <FontPrintElementRenderer
        element={payload.element}
        text={
          (payload.data as Record<string, string | number>)[
            payload.element.props.field.field
          ]
        }
      />
    )
  } else if (payload.element.type === EnumElementType.TABLE) {
    const rows = payload.getTable(payload.data)
    const columns = payload.element.props.columns ?? []
    const rowHeight = payload.element.props.rowHeight ?? 10
    const color = payload.element.props.color ?? '#000000'

    return (
      <div
        style={{
          position: 'absolute',
          left: `${payload.element.x}mm`,
          top: `${payload.element.y}mm`,
          width: `${payload.element.width}mm`,
          color: payload.element.props.color ?? '#000000',
          fontSize: payload.element.props.fontSize ?? 16,
          overflow: 'hidden',
        }}
      >
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead
                  key={column.field}
                  className="border border-black font-bold"
                  style={{
                    width: `${column.width}mm`,
                    height: `${rowHeight}mm`,
                    color,
                  }}
                >
                  {column.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row: Record<string, string | number>, index: number) => (
              <TableRow key={index}>
                {columns.map(column => (
                  <TableCell
                    key={column.field}
                    className="border border-black"
                    style={{
                      height: `${rowHeight}mm`,
                    }}
                  >
                    {row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return null
}

// const paginateTableRows = (
//   element: ConfigPrintElement,
//   data: ConfigPrintData,
//   paperHeight: number
// ) => {
//   const field = element.props.field ?? 'items'
//   const value = (data as unknown as Record<string, unknown>)[field]
//   const rows = Array.isArray(value)
//     ? (value as Array<Record<string, string | number>>)
//     : []

//   const rowHeight = element.props.rowHeight ?? 10
//   const headerHeight = rowHeight
//   const availableHeight = paperHeight - element.y - headerHeight
//   const rowCount = Math.max(1, Math.floor(availableHeight / rowHeight))

//   const pages: Record<string, string | number>[][] = []

//   for (let i = 0; i < rows.length; i += rowCount) {
//     pages.push(rows.slice(i, i + rowCount))
//   }

//   return pages.length ? pages : [[]]
// }

const paginateTableRows = <
  T,
  R extends Record<string, string | number>,
>(payload: {
  element: ConfigTableElement
  data: T
  getTable: (value: T) => Array<R>
}) => {
  const rows = payload.getTable(payload.data)

  const rowHeight = payload.element.props.rowHeight ?? 10
  const headerHeight = rowHeight

  // 关键：按表格自身高度分页，而不是按纸张剩余高度
  const availableHeight = payload.element.height - headerHeight
  const rowCount = Math.max(1, Math.floor(availableHeight / rowHeight))

  const pages: Record<string, string | number>[][] = []

  for (let i = 0; i < rows.length; i += rowCount) {
    pages.push(rows.slice(i, i + rowCount))
  }

  return pages.length ? pages : [[]]
}

export const PrintRenderer = <
  T,
  R extends Record<string, string | number>,
>(payload: {
  paperSize: ConfigPaperSize
  elements: Array<ConfigElement>
  data: T
  getTable: (value: T) => Array<R>
}) => {
  const tableElement = payload.elements.find(
    item => item.type === EnumElementType.TABLE
  )

  const normalElements = payload.elements.filter(
    item => item.type !== EnumElementType.TABLE
  )

  const tablePages = tableElement
    ? paginateTableRows({
        element: tableElement,
        data: payload.data,
        getTable: payload.getTable,
      })
    : [[]]

  return (
    <>
      {tablePages.map((rows, index) => (
        <div
          key={index}
          className="relative overflow-hidden bg-white print:break-after-page last:print:break-after-auto"
          style={{
            width: `${payload.paperSize.width}mm`,
            height: `${payload.paperSize.height}mm`,
          }}
        >
          {normalElements.map(element => (
            <PrintElementRenderer
              key={element.id}
              element={element}
              data={payload.data}
              getTable={payload.getTable}
            />
          ))}

          {tableElement && (
            <PrintElementRenderer
              element={tableElement}
              data={payload.data}
              getTable={() => rows}
            />
          )}
        </div>
      ))}
    </>
  )
}

export const ReviewRenderer = <
  R extends Record<string, string | number>,
  T extends { items: Array<R> },
>(payload: {
  paperSize: ConfigPaperSize
  elements: Array<ConfigElement>
  data: T
}) => {
  const tableElement = payload.elements.find(
    item => item.type === EnumElementType.TABLE
  )

  const normalElements = payload.elements.filter(
    item => item.type !== EnumElementType.TABLE
  )

  const tablePages = tableElement
    ? paginateTableRows({
        element: tableElement,
        data: payload.data,
        getTable: value => value.items,
      })
    : [[]]

  return (
    <>
      {tablePages.map((rows, index) => (
        <div
          key={index}
          className="relative overflow-hidden bg-white print last:print"
          style={{
            width: `${payload.paperSize.width}mm`,
            height: `${payload.paperSize.height}mm`,
          }}
        >
          {normalElements.map(element => (
            <PrintElementRenderer
              key={element.id}
              element={element}
              data={payload.data}
              getTable={() => rows}
            />
          ))}

          {tableElement && (
            <PrintElementRenderer
              element={tableElement}
              data={payload.data}
              getTable={() => rows}
            />
          )}
        </div>
      ))}
    </>
  )
}
