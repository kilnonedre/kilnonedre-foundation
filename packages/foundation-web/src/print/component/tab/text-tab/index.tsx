import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shadcn/components/tabs'

import {
  ColorInput,
  ContentInput,
  FontSizeInput,
  HeightInput,
  TextAlignSelect,
  WidthInput,
  XInput,
  YInput,
} from '@/print/component/tab/component/input'

import type * as types from '../type'

const TextTab = (props: types.ConfigProp) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList>
        <TabsTrigger value="basic">基础信息</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <div className="flex flex-col gap-2">
          <XInput element={props.element} updateElement={props.updateElement} />
          <YInput element={props.element} updateElement={props.updateElement} />
          <WidthInput
            element={props.element}
            updateElement={props.updateElement}
          />
          <HeightInput
            element={props.element}
            updateElement={props.updateElement}
          />
          <FontSizeInput
            element={props.element}
            updateElement={props.updateElementProps}
          />
          <ColorInput
            element={props.element}
            updateElement={props.updateElementProps}
          />
          <ContentInput
            element={props.element}
            updateElement={props.updateElementProps}
          />
          <TextAlignSelect
            element={props.element}
            updateElement={props.updateElementProps}
          />
          <FontSizeInput
            element={props.element}
            updateElement={props.updateElementProps}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default TextTab
