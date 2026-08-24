import {
  FieldBaseColor,
  FieldBaseEnumSelect,
  FieldBaseNumberInput,
  FieldBaseTextarea,
} from '@/print/component/field-base'
import type * as types from './type'
import { enumTextAlignOptions } from '@/print/enum/text-align'
import { enumFontWeightOptions } from '@/print/enum/font-weight'
import { EnumElementType } from '@/print/enum/element-type'

export const XInput = (props: types.ConfigProp) => {
  return (
    <FieldBaseNumberInput
      id="x"
      label="X"
      value={props.element.x}
      onChange={value =>
        props.updateElement(props.element.id, {
          x: value,
        })
      }
    />
  )
}

export const YInput = (props: types.ConfigProp) => {
  return (
    <FieldBaseNumberInput
      id="y"
      label="Y"
      value={props.element.y}
      onChange={value => props.updateElement(props.element.id, { y: value })}
    />
  )
}

export const WidthInput = (props: types.ConfigProp) => {
  return (
    <FieldBaseNumberInput
      id="width"
      label="宽度"
      value={props.element.width}
      onChange={value =>
        props.updateElement(props.element.id, {
          width: value,
        })
      }
    />
  )
}

export const HeightInput = (props: types.ConfigProp) => {
  return (
    <FieldBaseNumberInput
      id="height"
      label="高度"
      value={props.element.height}
      onChange={value =>
        props.updateElement(props.element.id, {
          height: value,
        })
      }
    />
  )
}

export const FontSizeInput = (props: types.ConfigPropsProp) => {
  return (
    <FieldBaseNumberInput
      id="fontSize"
      label="字号"
      value={props.element.props.fontSize ?? 16}
      onChange={value =>
        props.updateElement(props.element.id, {
          fontSize: value,
        })
      }
    />
  )
}

export const ColorInput = (props: types.ConfigPropsProp) => {
  return (
    <FieldBaseColor
      id="color"
      label="颜色"
      color={props.element.props.color}
      onChange={value =>
        props.updateElement(props.element.id, {
          color: value,
        })
      }
    />
  )
}

export const ContentInput = (props: types.ConfigPropsProp) => {
  if (props.element.type !== EnumElementType.TEXT) {
    return null
  }

  return (
    <FieldBaseTextarea
      id="content"
      label="内容"
      value={props.element.props.text}
      onChange={value =>
        props.updateElement(props.element.id, {
          text: value,
        })
      }
    />
  )
}

export const TextAlignSelect = (props: types.ConfigPropsProp) => {
  if (props.element.type !== EnumElementType.TEXT) {
    return null
  }
  return (
    <FieldBaseEnumSelect
      id="textAlign"
      label="对齐"
      value={(props.element.props.textAlign ?? 'left').toUpperCase()}
      optionList={enumTextAlignOptions}
      onValueChange={value =>
        props.updateElement(props.element.id, {
          textAlign: value.toLowerCase(),
        })
      }
    />
  )
}

export const FontWeightSelect = (props: types.ConfigPropsProp) => {
  if (props.element.type !== EnumElementType.TEXT) {
    return null
  }
  return (
    <FieldBaseEnumSelect
      id="fontWeight"
      label="字重"
      value={(props.element.props.fontWeight ?? 'normal').toUpperCase()}
      optionList={enumFontWeightOptions}
      onValueChange={value =>
        props.updateElement(props.element.id, {
          fontWeight: value.toLowerCase(),
        })
      }
    />
  )
}

export const LineHeightInput = (props: types.ConfigPropsProp) => {
  if (props.element.type !== EnumElementType.TABLE) {
    return null
  }
  return (
    <FieldBaseNumberInput
      id="lineHeight"
      label="行高"
      value={props.element.props.rowHeight ?? 10}
      onChange={value =>
        props.updateElement(props.element.id, {
          rowHeight: value,
        })
      }
    />
  )
}
