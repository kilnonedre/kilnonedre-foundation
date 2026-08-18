import { v4 as uuidv4 } from 'uuid'
import {
  ConfigPrintData,
  ConfigPrintElement,
  EnumElementType,
} from '@/print/type'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/table'

export const createElement = (
  type: EnumElementType,
  x = 20,
  y = 20
): ConfigPrintElement => {
  if (type === EnumElementType.TABLE) {
    return {
      id: uuidv4(),
      type: EnumElementType.TABLE,
      x,
      y,
      width: 170,
      height: 80,
      props: {
        field: 'items',
        rowHeight: 10,
        fontSize: 16,
        color: '#000000',
        columns: [
          { title: '商品名称', field: 'name', width: 50 },
          { title: '单位', field: 'unit', width: 25 },
          { title: '数量', field: 'quantity', width: 25 },
          { title: '单价', field: 'price', width: 30 },
        ],
      },
    }
  }

  return {
    id: uuidv4(),
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

export const replaceVars = (text = '', data: ConfigPrintData) => {
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    return String(data[key as keyof ConfigPrintData] ?? '')
  })
}

const TextElementRenderer = ({
  element,
  scale,
  data,
}: {
  element: ConfigPrintElement
  scale: number
  data: ConfigPrintData
}) => {
  return (
    <div
      style={{
        fontSize: element.props.fontSize ?? 16,
        color: element.props.color ?? '#000000',
        fontWeight: element.props.fontWeight ?? 'normal',
        textAlign:
          (element.props.textAlign?.toLowerCase() as React.CSSProperties['textAlign']) ??
          'left',
        lineHeight: `${element.height * scale}px`,
      }}
    >
      {replaceVars(element.props.text, data)}
    </div>
  )
}

export const ElementRenderer = ({
  element,
  scale,
  data,
}: {
  element: ConfigPrintElement
  scale: number
  data: ConfigPrintData
}) => {
  if (element.type === EnumElementType.TEXT) {
    return <TextElementRenderer element={element} scale={scale} data={data} />
  }

  if (element.type === EnumElementType.TABLE) {
    const field = element.props.field ?? 'items'
    const value = (data as unknown as Record<string, unknown>)[field]
    const rows = Array.isArray(value)
      ? (value as Array<Record<string, string | number>>)
      : []
    const columns = element.props.columns ?? []
    const rowHeight = (element.props.rowHeight ?? 10) * scale
    const color = element.props.color ?? '#000000'

    return (
      <>
        <Table
          className="border border-black"
          style={{
            fontSize: element.props.fontSize ?? 16,
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
                    width: column.width * scale,
                    height: rowHeight,
                    color,
                  }}
                >
                  {column.title}
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

const TextPrintElementRenderer = (props: {
  element: ConfigPrintElement
  data: ConfigPrintData
}) => {
  const element = props.element

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
      {replaceVars(element.props.text, props.data)}
    </div>
  )
}

export const PrintElementRenderer = (props: {
  element: ConfigPrintElement
  data: ConfigPrintData
}) => {
  const element = props.element

  if (element.type === EnumElementType.TEXT) {
    return <TextPrintElementRenderer element={element} data={props.data} />
  }

  if (element.type === EnumElementType.TABLE) {
    const field = element.props.field ?? 'items'
    const value = (props.data as unknown as Record<string, unknown>)[field]
    const rows = Array.isArray(value)
      ? (value as Array<Record<string, string | number>>)
      : []
    const columns = element.props.columns ?? []
    const rowHeight = element.props.rowHeight ?? 10
    const color = element.props.color ?? '#000000'

    return (
      <div
        style={{
          position: 'absolute',
          left: `${element.x}mm`,
          top: `${element.y}mm`,
          width: `${element.width}mm`,
          color: element.props.color ?? '#000000',
          fontSize: element.props.fontSize ?? 16,
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
                  {column.title}
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

const paginateTableRows = (
  element: ConfigPrintElement,
  data: ConfigPrintData
) => {
  const field = element.props.field ?? 'items'
  const value = (data as unknown as Record<string, unknown>)[field]
  const rows = Array.isArray(value)
    ? (value as Array<Record<string, string | number>>)
    : []

  const rowHeight = element.props.rowHeight ?? 10
  const headerHeight = rowHeight

  // 关键：按表格自身高度分页，而不是按纸张剩余高度
  const availableHeight = element.height - headerHeight
  const rowCount = Math.max(1, Math.floor(availableHeight / rowHeight))

  const pages: Record<string, string | number>[][] = []

  for (let i = 0; i < rows.length; i += rowCount) {
    pages.push(rows.slice(i, i + rowCount))
  }

  return pages.length ? pages : [[]]
}

export const PrintRenderer = (props: {
  paperWidth: number
  paperHeight: number
  elements: ConfigPrintElement[]
  data: ConfigPrintData
}) => {
  const tableElement = props.elements.find(
    item => item.type === EnumElementType.TABLE
  )

  const normalElements = props.elements.filter(
    item => item.type !== EnumElementType.TABLE
  )

  const tablePages = tableElement
    ? paginateTableRows(tableElement, props.data)
    : [[]]

  return (
    <>
      {tablePages.map((rows, index) => {
        const pageData = tableElement
          ? ({
              ...props.data,
              [tableElement.props.field ?? 'items']: rows,
            } as ConfigPrintData)
          : props.data

        return (
          <div
            key={index}
            className="relative overflow-hidden bg-white print:break-after-page last:print:break-after-auto"
            style={{
              width: `${props.paperWidth}mm`,
              height: `${props.paperHeight}mm`,
            }}
          >
            {normalElements.map(element => (
              <PrintElementRenderer
                key={element.id}
                element={element}
                data={props.data}
              />
            ))}

            {tableElement && (
              <PrintElementRenderer element={tableElement} data={pageData} />
            )}
          </div>
        )
      })}
    </>
  )
}
