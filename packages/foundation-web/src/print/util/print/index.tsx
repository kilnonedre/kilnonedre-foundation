import { PrintRenderer, ReviewRenderer } from '@/print/util'
import type * as types from './type'

const print = async <T,>(props: types.ConfigRenderProp<T>) => {
  const { renderToStaticMarkup } = await import('react-dom/server')

  const printHtml = renderToStaticMarkup(props.render())

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
              size: ${props.paperSize.width}mm ${props.paperSize.height}mm;
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

export const reviewPrint = <T, R extends Record<string, string | number>>(
  props: types.ConfigProp<T>
) =>
  print({
    ...props,
    render: () => (
      <ReviewRenderer
        paperSize={props.paperSize}
        elements={props.elements}
        data={
          props.data as T & {
            items: Array<R>
          }
        }
      />
    ),
  })

export const printTemplate = <T, R extends Record<string, string | number>>(
  props: types.ConfigPrintProp<T, R>
) =>
  print({
    ...props,
    render: () => (
      <PrintRenderer
        paperSize={props.paperSize}
        elements={props.elements}
        getTable={props.getTable}
        data={
          props.data as T & {
            items: Array<R>
          }
        }
      />
    ),
  })
