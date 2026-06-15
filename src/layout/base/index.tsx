import type * as types from './type'

export const BaseLayout = (props: types.ConfigProp) => {
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
