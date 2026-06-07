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
  FieldBaseColor,
  FieldBaseEnumSelect,
  FieldBaseInput,
  FieldBaseTextarea,
} from '@/print/component/field-base'
import HorizontalRuler from '@/print/component/horizontal-ruler'
import LibraryItem from '@/print/component/library-item'
import VerticalRuler from '@/print/component/vertical-ruler'
import {
  injectedData,
  mockData,
  PAPER_PRESETS,
  SNAP_DISTANCE,
} from '@/print/mock'
import { createElement, ElementRenderer, PrintRenderer } from '@/print/util'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shadcn/components/tabs'
import { cn } from '@/util'
import type * as types from './type'
import {
  EnumElementType,
  enumElementTypeOptions,
  enumFontWeightOptions,
  enumTextAlignOptions,
} from './type'

export const SimplePrintDesignerDemo = () => {
  const paperRef = useRef<HTMLDivElement | null>(null)

  const [paperWidth, setPaperWidth] = useState(210)
  const [paperHeight, setPaperHeight] = useState(297)
  const [scale, setScale] = useState(3)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [guideLines, setGuideLines] = useState<
    { type: 'vertical' | 'horizontal'; position: number }[]
  >([])

  const [elements, setElements] = useState<Array<types.ConfigPrintElement>>([])

  const selectedElement = useMemo(() => {
    return elements.find(item => item.id === selectedId) ?? null
  }, [elements, selectedId])

  const updateElement = (
    id: string,
    patch: Partial<types.ConfigPrintElement>
  ) => {
    setElements(list =>
      list.map(item => (item.id === id ? { ...item, ...patch } : item))
    )
  }

  const updateElementProps = (
    id: string,
    patch: Partial<types.ConfigPrintElement['props']>
  ) => {
    setElements(list =>
      list.map(item =>
        item.id === id ? { ...item, props: { ...item.props, ...patch } } : item
      )
    )
  }

  const addElement = (type: types.EnumElementType, x = 20, y = 20) => {
    const element = createElement(type, x, y)

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

  const snapPosition = (
    element: types.ConfigPrintElement,
    x: number,
    y: number
  ) => {
    let nextX = x
    let nextY = y

    const lines: { type: 'vertical' | 'horizontal'; position: number }[] = []

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
      paperWidth / 2,
      paperWidth,
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
      paperHeight / 2,
      paperHeight,
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
        lines.push({ type: 'vertical', position: target })
        break
      }
    }

    for (const target of horizontalTargets) {
      const matched = currentHorizontalPoints.find(
        item => Math.abs(item.point - target) <= SNAP_DISTANCE
      )

      if (matched) {
        nextY = target - matched.offset
        lines.push({ type: 'horizontal', position: target })
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
    type: types.EnumElementType
  ) => {
    event.dataTransfer.setData('element/type', type)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const type = event.dataTransfer.getData(
      'element/type'
    ) as types.EnumElementType
    if (!type || !paperRef.current) return

    const rect = paperRef.current.getBoundingClientRect()

    const x = Math.round((event.clientX - rect.left) / scale)
    const y = Math.round((event.clientY - rect.top) / scale)

    addElement(type, x, y)
  }

  const applyPaperPreset = (value: string) => {
    const preset = PAPER_PRESETS.find(item => item.value === value)
    if (!preset) return

    setPaperWidth(preset.width)
    setPaperHeight(preset.height)
  }

  const exportJson = () => {
    console.log(
      JSON.stringify(
        {
          paper: {
            width: paperWidth,
            height: paperHeight,
          },
          elements,
        },
        null,
        2
      )
    )
  }

  const printTemplate = async (data: types.ConfigPrintData) => {
    const { renderToStaticMarkup } = await import('react-dom/server')

    const printHtml = renderToStaticMarkup(
      <PrintRenderer
        paperWidth={paperWidth}
        paperHeight={paperHeight}
        elements={elements}
        data={data}
      />
    )

    const styleTags = Array.from(
      document.querySelectorAll<HTMLStyleElement | HTMLLinkElement>(
        'style, link[rel="stylesheet"]'
      )
    )
      .map(node => node.outerHTML)
      .join('\n')

    const iframe = document.createElement('iframe')

    iframe.style.position = 'fixed'
    iframe.style.right = '0'
    iframe.style.bottom = '0'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = '0'
    iframe.style.visibility = 'hidden'

    document.body.appendChild(iframe)

    const iframeWindow = iframe.contentWindow
    const iframeDocument = iframe.contentDocument

    if (!iframeWindow || !iframeDocument) {
      document.body.removeChild(iframe)
      return
    }

    iframeDocument.open()
    iframeDocument.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>打印预览</title>
          ${styleTags}
          <style>
            @page {
              size: ${paperWidth}mm ${paperHeight}mm;
              margin: 0;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              background: #fff;
            }

            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            table {
              border-collapse: collapse;
            }
          </style>
        </head>

        <body>
          ${printHtml}
        </body>
      </html>
    `)
    iframeDocument.close()

    const removeIframe = () => {
      setTimeout(() => {
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe)
        }
      }, 300)
    }

    iframeWindow.addEventListener('afterprint', removeIframe, { once: true })

    setTimeout(() => {
      iframeWindow.focus()
      iframeWindow.print()
    }, 100)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100 text-gray-900">
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
          defaultValue="A4"
          onChange={e => applyPaperPreset(e.target.value)}
        >
          {PAPER_PRESETS.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <FieldBaseInput
          id="paperWidth"
          label="宽"
          maxWidth={100}
          value={String(paperWidth)}
          onChange={value => setPaperWidth(Number(value))}
        />

        <FieldBaseInput
          id="paperHeight"
          label="高"
          maxWidth={100}
          value={String(paperHeight)}
          onChange={value => setPaperHeight(Number(value))}
        />

        <FieldBaseInput
          id="scale"
          label="缩放"
          maxWidth={100}
          value={String(scale)}
          onChange={value => setScale(Number(value))}
        />

        <Button onClick={() => printTemplate(injectedData)}>预览</Button>

        <Button onClick={exportJson}>导出数据</Button>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main className="min-h-0 min-w-0 flex-1 overflow-auto p-6">
          <div
            className="relative my-0 mx-auto"
            style={{
              width: paperWidth * scale + 32,
              height: paperHeight * scale + 32,
            }}
          >
            <div className="absolute left-0 top-0 h-8 w-8 border-b border-r border-slate-300 bg-slate-50" />

            <HorizontalRuler width={paperWidth} scale={scale} />

            <VerticalRuler height={paperHeight} scale={scale} />

            <div
              ref={paperRef}
              className="absolute left-8 top-8 bg-white shadow-lg"
              style={{
                width: paperWidth * scale,
                height: paperHeight * scale,
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
                    line.type === 'vertical'
                      ? 'top-0 bottom-0 w-px'
                      : 'left-0 right-0 h-px'
                  )}
                  style={
                    line.type === 'vertical'
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
                    data={mockData}
                  />
                </Rnd>
              ))}
            </div>
          </div>
        </main>

        <aside className="min-h-0 w-80 shrink-0 overflow-auto border-l border-gray-200 bg-white p-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList>
              <TabsTrigger value="basic">基础信息</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              {!selectedElement ? (
                <div className="empty-text">请选择一个元素</div>
              ) : (
                <div className="flex flex-col gap-2">
                  <FieldBaseInput
                    id="x"
                    label="X"
                    value={String(selectedElement.x)}
                    onChange={value =>
                      updateElement(selectedElement.id, { x: Number(value) })
                    }
                  />

                  <FieldBaseInput
                    id="y"
                    label="Y"
                    value={String(selectedElement.y)}
                    onChange={value =>
                      updateElement(selectedElement.id, { y: Number(value) })
                    }
                  />

                  <FieldBaseInput
                    id="width"
                    label="宽度"
                    value={String(selectedElement.width)}
                    onChange={value =>
                      updateElement(selectedElement.id, {
                        width: Number(value),
                      })
                    }
                  />

                  <FieldBaseInput
                    id="height"
                    label="高度"
                    value={String(selectedElement.height)}
                    onChange={value =>
                      updateElement(selectedElement.id, {
                        height: Number(value),
                      })
                    }
                  />

                  <FieldBaseInput
                    id="fontSize"
                    label="字号"
                    value={String(selectedElement.props.fontSize ?? 16)}
                    onChange={value =>
                      updateElementProps(selectedElement.id, {
                        fontSize: Number(value),
                      })
                    }
                  />

                  <FieldBaseColor
                    id="color"
                    label="颜色"
                    color={selectedElement.props.color}
                    onChange={value =>
                      updateElementProps(selectedElement.id, {
                        color: value,
                      })
                    }
                  />

                  {selectedElement.type === EnumElementType.TEXT && (
                    <>
                      <FieldBaseTextarea
                        id="content"
                        label="内容"
                        value={selectedElement.props.text}
                        onChange={value =>
                          updateElementProps(selectedElement.id, {
                            text: value,
                          })
                        }
                      />

                      <FieldBaseEnumSelect
                        id="textAlign"
                        label="对齐"
                        value={(
                          selectedElement.props.textAlign ?? 'left'
                        ).toUpperCase()}
                        optionList={enumTextAlignOptions}
                        onValueChange={value =>
                          updateElementProps(selectedElement.id, {
                            textAlign: value.toLowerCase(),
                          })
                        }
                      />

                      <FieldBaseEnumSelect
                        id="fontWeight"
                        label="字重"
                        value={(
                          selectedElement.props.fontWeight ?? 'normal'
                        ).toUpperCase()}
                        optionList={enumFontWeightOptions}
                        onValueChange={value =>
                          updateElementProps(selectedElement.id, {
                            fontWeight: value.toLowerCase(),
                          })
                        }
                      />
                    </>
                  )}

                  {selectedElement.type === EnumElementType.TABLE && (
                    <FieldBaseInput
                      id="lineHeight"
                      label="行高"
                      value={String(selectedElement.props.rowHeight ?? 10)}
                      onChange={value =>
                        updateElementProps(selectedElement.id, {
                          rowHeight: Number(value),
                        })
                      }
                    />
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </aside>
      </div>
    </div>
  )
}
