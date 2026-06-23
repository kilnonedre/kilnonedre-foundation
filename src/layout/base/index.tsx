import { Title } from '@/components'
import { Separator } from '@/shadcn/components/separator'
import type * as types from './type'

const BaseLayoutRoot = (props: types.ConfigBaseLayoutRootProp) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <div className="py-4 px-4 md:gap-6 md:py-6 lg:px-6 h-full">
          {props.children}
        </div>
      </div>
      {props.footer && (
        <div className="border-t bg-white px-4 py-3 lg:px-6 sticky bottom-0">
          {props.footer}
        </div>
      )}
    </div>
  )
}

const BaseLayoutTitle = (props: types.ConfigBaseLayoutTitleProp) => {
  return <Title>{props.children}</Title>
}

const BaseLayoutSection = (props: types.ConfigBaseLayoutSectionProp) => {
  return (
    <>
      {props.title && <Title>{props.title}</Title>}
      <div className="p-2">{props.children}</div>
    </>
  )
}

const BaseLayoutSeparator = () => {
  return <Separator className="my-6" />
}

export const BaseLayout = Object.assign(BaseLayoutRoot, {
  Title: BaseLayoutTitle,
  Section: BaseLayoutSection,
  Separator: BaseLayoutSeparator,
})
