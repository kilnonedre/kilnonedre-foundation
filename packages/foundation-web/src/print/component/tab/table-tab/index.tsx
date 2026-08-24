import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shadcn/components/tabs'
import {
  ColorInput,
  FontSizeInput,
  HeightInput,
  LineHeightInput,
  WidthInput,
  XInput,
  YInput,
} from '@/print/component/tab/component/input'

import type * as types from './type'
import { FieldMultiSelect } from '@/print/component/field-multi-select'

const TableTab = (props: types.ConfigTableProp) => {
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
          <LineHeightInput
            element={props.element}
            updateElement={props.updateElementProps}
          />
        </div>
      </TabsContent>
      <TabsContent value="field">
        <FieldMultiSelect
          fields={props.columns}
          selectedFields={props.element.props.columns}
          onSelect={field =>
            props.updateElementProps(props.element.id, {
              columns: props.element.props.columns.some(
                item => item.field === field.field
              )
                ? props.element.props.columns.filter(
                    item => item.field !== field.field
                  )
                : [...props.element.props.columns, field],
            })
          }
        />
      </TabsContent>
    </Tabs>
  )
}

export default TableTab
