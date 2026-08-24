'use client'

import {
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Rnd } from 'react-rnd'
import { Button } from '@/components'
import {
  FieldBaseInput,
  FieldBaseNumberInput,
} from '@/print/component/field-base'
import HorizontalRuler from '@/print/component/horizontal-ruler'
import LibraryItem from '@/print/component/library-item'
import VerticalRuler from '@/print/component/vertical-ruler'
import { createInjectedData, createMockData, SNAP_DISTANCE } from '@/print/mock'
import { createElement, ElementRenderer } from '@/print/util'
import type * as types from './type'
import { cn, EnumDirection, UUID } from '@kilnonedre/foundation'
import {
  EnumElementType,
  enumElementTypeOptions,
} from '@/print/enum/element-type'
import TextTab from '@/print/component/tab/text-tab'
import TableTab from '@/print/component/tab/table-tab'
import { ConfigCreateElement, ConfigElement } from '@/print/type/element'
import FieldTab from '@/print/component/tab/field-tab'
import { reviewPrint } from '@/print/util/print'
import {
  EnumPaperType,
  enumPaperTypeOptions,
  EnumPaperTypeSize,
} from '@/print/enum'

export { EnumType, EnumElementType, EnumPaperType } from './enum'
export { printTemplate } from './util'
export {
  ConfigElement,
  ConfigTextElement,
  ConfigFieldElement,
  ConfigTableElement,
  ConfigTemplate,
} from './type'

export const PrintDesigner = <T, R extends Record<string, string | number>>(
  props: types.ConfigProp<T, R>
) => {
  const paperRef = useRef<HTMLDivElement | null>(null)

  const [scale, setScale] = useState(3)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [guideLines, setGuideLines] = useState<
    { type: EnumDirection; position: number }[]
  >([])

  const [elements, setElements] = useState<Array<ConfigElement>>(
    props.template?.elements ?? []
  )

  const [paperType, setPaperType] = useState<EnumPaperType>(
    props.template?.paper.type ?? EnumPaperType.A4
  )
  const [paperSize, setPaperSize] = useState<types.ConfigPaperSize>(
    props.template?.paper.size ?? EnumPaperTypeSize[EnumPaperType.A4]
  )

  const selectedElement = useMemo(() => {
    return elements.find(item => item.id === selectedId) ?? null
  }, [elements, selectedId])

  const updateElement = <T extends ConfigElement>(
    id: UUID,
    patch: Partial<T>
  ) => {
    setElements(list =>
      list.map(item => (item.id === id ? { ...item, ...patch } : item))
    )
  }

  const updateElementProps = <T extends ConfigElement>(
    id: UUID,
    patch: Partial<T['props']>
  ) => {
    setElements(list =>
      list.map(item =>
        item.id === id
          ? ({
              ...item,
              props: {
                ...item.props,
                ...patch,
              },
            } as ConfigElement)
          : item
      )
    )
  }

  const addElement = (payload: ConfigCreateElement) => {
    const element = createElement(payload)

    setElements(list => [...list, element])
    setSelectedId(element.id)
  }

  const removeSelected = useCallback(() => {
    if (!selectedId) return

    setElements(list => list.filter(item => item.id !== selectedId))
    setSelectedId(null)
  }, [selectedId])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Backspace') return
      if (!selectedId) return

      const target = event.target as HTMLElement | null
      const tagName = target?.tagName.toLowerCase()

      const isEditing =
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        target?.isContentEditable

      if (isEditing) return

      event.preventDefault()
      removeSelected()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedId, removeSelected])

  const snapPosition = (element: ConfigElement, x: number, y: number) => {
    let nextX = x
    let nextY = y

    const lines: { type: EnumDirection; position: number }[] = []

    const currentVerticalPoints = [
      { point: x, offset: 0 },
      { point: x + element.width / 2, offset: element.width / 2 },
      { point: x + element.width, offset: element.width },
    ]

    const currentHorizontalPoints = [
      { point: y, offset: 0 },
      { point: y + element.height / 2, offset: element.height / 2 },
      { point: y + element.height, offset: element.height },
    ]

    const verticalTargets = [
      0,
      paperSize.width / 2,
      paperSize.width,
      ...elements
        .filter(item => item.id !== element.id)
        .flatMap(item => [
          item.x,
          item.x + item.width / 2,
          item.x + item.width,
        ]),
    ]

    const horizontalTargets = [
      0,
      paperSize.height / 2,
      paperSize.height,
      ...elements
        .filter(item => item.id !== element.id)
        .flatMap(item => [
          item.y,
          item.y + item.height / 2,
          item.y + item.height,
        ]),
    ]

    for (const target of verticalTargets) {
      const matched = currentVerticalPoints.find(
        item => Math.abs(item.point - target) <= SNAP_DISTANCE
      )

      if (matched) {
        nextX = target - matched.offset
        lines.push({ type: EnumDirection.VERTICAL, position: target })
        break
      }
    }

    for (const target of horizontalTargets) {
      const matched = currentHorizontalPoints.find(
        item => Math.abs(item.point - target) <= SNAP_DISTANCE
      )

      if (matched) {
        nextY = target - matched.offset
        lines.push({ type: EnumDirection.HORIZONTAL, position: target })
        break
      }
    }

    return {
      x: Math.round(nextX),
      y: Math.round(nextY),
      lines,
    }
  }

  const handleDragStart = (
    event: DragEvent<HTMLDivElement>,
    type: EnumElementType
  ) => {
    event.dataTransfer.setData('element/type', type)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const type = event.dataTransfer.getData('element/type') as EnumElementType
    if (!type || !paperRef.current) return

    const rect = paperRef.current.getBoundingClientRect()

    const x = Math.round((event.clientX - rect.left) / scale)
    const y = Math.round((event.clientY - rect.top) / scale)

    if (type === EnumElementType.TEXT) {
      addElement({ type, x, y })
    } else if (type === EnumElementType.FIELD) {
      addElement({ type, x, y, field: props.fields[0] })
    } else {
      addElement({ type, x, y, columns: [props.columns[0]] })
    }
  }

  const applyPaperPreset = (type: EnumPaperType) => {
    const size = EnumPaperTypeSize[type]
    if (!size) return
    setPaperType(type)
    setPaperSize(size)
  }

  const exportJson = () => {
    props.onConfirm({
      paper: {
        type: paperType,
        size: paperSize,
      },
      elements,
    })
  }

  const renderTab = () => {
    if (!selectedElement) {
      return
    }
    if (selectedElement.type === EnumElementType.TEXT) {
      return (
        <TextTab
          element={selectedElement}
          updateElement={updateElement}
          updateElementProps={updateElementProps}
        />
      )
    } else if (selectedElement.type === EnumElementType.TABLE) {
      return (
        <TableTab
          columns={props.columns}
          element={selectedElement}
          updateElement={updateElement}
          updateElementProps={updateElementProps}
          updateFieldElement={updateElementProps}
        />
      )
    } else if (selectedElement.type === EnumElementType.FIELD) {
      return (
        <FieldTab
          fields={props.fields}
          element={selectedElement}
          updateElement={updateElement}
          updateElementProps={updateElementProps}
          updateFieldElement={updateElementProps}
        />
      )
    }
  }

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col overflow-hidden bg-slate-100 text-gray-900',
        props.className
      )}
    >
      <div className="flex h-14 shrink-0 items-center gap-2 overflow-x-auto border-b border-gray-200 bg-white px-4">
        {enumElementTypeOptions.map(element => (
          <LibraryItem
            key={element.value}
            type={element.value}
            onDragStart={handleDragStart}
          >
            {element.label}
          </LibraryItem>
        ))}

        <select
          className="toolbar-input"
          value={paperType}
          onChange={e => applyPaperPreset(e.target.value as EnumPaperType)}
        >
          {enumPaperTypeOptions.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <FieldBaseNumberInput
          id="paperWidth"
          label="宽"
          maxWidth={100}
          value={paperSize.width}
          onChange={value =>
            setPaperSize(prev => ({
              ...prev,
              width: value,
            }))
          }
        />

        <FieldBaseNumberInput
          id="paperHeight"
          label="高"
          maxWidth={100}
          value={paperSize.height}
          onChange={value =>
            setPaperSize(prev => ({
              ...prev,
              height: value,
            }))
          }
        />

        <FieldBaseInput
          id="scale"
          label="缩放"
          maxWidth={100}
          value={String(scale)}
          onChange={value => setScale(Number(value))}
        />

        <div className="ml-auto">
          <Button
            onClick={() =>
              reviewPrint({
                data: createInjectedData(props.fields, props.columns, 40),
                paperSize,
                elements,
              })
            }
          >
            预览
          </Button>
        </div>

        <Button onClick={exportJson}>保存</Button>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main className="min-h-0 min-w-0 flex-1 overflow-auto p-6">
          <div
            className="relative my-0 mx-auto"
            style={{
              width: paperSize.width * scale + 32,
              height: paperSize.height * scale + 32,
            }}
          >
            <div className="absolute left-0 top-0 h-8 w-8 border-b border-r border-slate-300 bg-slate-50" />

            <HorizontalRuler width={paperSize.width} scale={scale} />

            <VerticalRuler height={paperSize.height} scale={scale} />

            <div
              ref={paperRef}
              className="absolute left-8 top-8 bg-white shadow-lg"
              style={{
                width: paperSize.width * scale,
                height: paperSize.height * scale,
              }}
              onClick={() => setSelectedId(null)}
              onDragOver={event => event.preventDefault()}
              onDrop={handleDrop}
            >
              {guideLines.map((line, index) => (
                <div
                  key={index}
                  className={cn(
                    'pointer-events-none absolute z-9999 bg-blue-500 transition-all duration-75 ease-in-out',
                    line.type === EnumDirection.VERTICAL
                      ? 'top-0 bottom-0 w-px'
                      : 'left-0 right-0 h-px'
                  )}
                  style={
                    line.type === EnumDirection.VERTICAL
                      ? { left: line.position * scale }
                      : { top: line.position * scale }
                  }
                />
              ))}

              {elements.map(element => (
                <Rnd
                  key={element.id}
                  bounds="parent"
                  size={{
                    width: element.width * scale,
                    height: element.height * scale,
                  }}
                  position={{
                    x: element.x * scale,
                    y: element.y * scale,
                  }}
                  onMouseDown={event => {
                    event.stopPropagation()
                    setSelectedId(element.id)
                  }}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    event.stopPropagation()
                    setSelectedId(element.id)
                  }}
                  onDrag={(_, data) => {
                    const rawX = Math.round(data.x / scale)
                    const rawY = Math.round(data.y / scale)
                    const snapped = snapPosition(element, rawX, rawY)

                    setGuideLines(snapped.lines)
                  }}
                  onDragStop={(_, data) => {
                    const rawX = Math.round(data.x / scale)
                    const rawY = Math.round(data.y / scale)
                    const snapped = snapPosition(element, rawX, rawY)

                    updateElement(element.id, {
                      x: snapped.x,
                      y: snapped.y,
                    })

                    setGuideLines([])
                  }}
                  onResizeStop={(_, __, ref, ___, position) => {
                    updateElement(element.id, {
                      x: Math.round(position.x / scale),
                      y: Math.round(position.y / scale),
                      width: Math.round(ref.offsetWidth / scale),
                      height: Math.round(ref.offsetHeight / scale),
                    })
                  }}
                  className={cn(
                    'outline',
                    selectedId === element.id
                      ? 'outline-2 outline-blue-500 hover:outline-blue-500'
                      : 'outline-1 outline-transparent hover:outline-slate-300'
                  )}
                >
                  <ElementRenderer
                    element={element}
                    scale={scale}
                    data={createMockData<T>(props.fields, props.columns)}
                  />
                </Rnd>
              ))}
            </div>
          </div>
        </main>

        <aside className="min-h-0 w-80 shrink-0 overflow-auto border-l border-gray-200 bg-white p-4">
          {!selectedElement ? (
            <div className="empty-text">请选择一个元素</div>
          ) : (
            renderTab()
          )}
        </aside>
      </div>
    </div>
  )
}
