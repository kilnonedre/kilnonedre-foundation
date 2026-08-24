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

import type * as types from './type'
import { FieldSingleSelect } from '@/print/component/field-multi-select'

const FieldTab = (props: types.ConfigFieldProp) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList>
        <TabsTrigger value="basic">基础信息</TabsTrigger>
        <TabsTrigger value="field">字段信息</TabsTrigger>
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
      <TabsContent value="field">
        <FieldSingleSelect
          fields={props.fields}
          selectedField={props.element.props.field}
          onSelect={field =>
            props.updateElementProps(props.element.id, { field })
          }
        />
      </TabsContent>
    </Tabs>
  )
}

export default FieldTab
