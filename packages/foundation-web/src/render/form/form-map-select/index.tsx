import { useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { Button, FieldController } from '@/components'
import { AMap, Marker } from '@/map/amap'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/components/dialog'
import type * as types from './type'
import {
  EnumMarkerType,
  EnumSemanticColor,
  EnumVariant,
} from '@kilnonedre/foundation'

export const FormMapSelect = <T extends FieldValues>(
  props: types.ConfigProp<T>
) => {
  const [open, setOpen] = useState(false)

  return (
    <FieldController
      {...props}
      control={props.form.control}
      required={props.required ?? true}
    >
      {({ field, fieldState, id }) => {
        return (
          <MapDialog
            value={field.value}
            aKey={props.aKey}
            securityCode={props.securityCode}
            id={id}
            invalid={fieldState.invalid}
            open={open}
            setOpen={setOpen}
            onConfirm={location => {
              field.onChange(location)
              props.onConfirm?.(location)
              setOpen(false)
            }}
          />
        )
      }}
    </FieldController>
  )
}

export const MapDialog = (props: types.ConfigMapDialogProp) => {
  const center =
    props.center ??
    (props.value ? [props.value.longitude, props.value.latitude] : undefined)
  return (
    <>
      <Button
        id={props.id}
        type="button"
        variant={EnumVariant.OUTLINE}
        aria-invalid={props.invalid}
        className="inline-flex h-auto max-w-full min-w-0 justify-start py-2 text-left whitespace-normal!"
        onClick={() => props.setOpen(true)}
      >
        <span className="min-w-0 break-all whitespace-normal text-left">
          {props.value?.poiName || props.value?.address || '请选择位置'}
        </span>
      </Button>

      <Dialog open={props.open} onOpenChange={props.setOpen}>
        <DialogContent className="w-[80vw] max-w-none!">
          <DialogHeader>
            <DialogTitle>选择地图位置</DialogTitle>
          </DialogHeader>

          <MapDialogBody
            center={center}
            value={props.value}
            aKey={props.aKey}
            securityCode={props.securityCode}
            onConfirm={location => {
              props.onConfirm?.(location)
              props.setOpen(false)
            }}
            onCancel={() => props.setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

const MapDialogBody = (props: types.ConfigMapDialogBodyProp) => {
  const [selected, setSelected] = useState(props.value)

  return (
    <>
      <div className="h-[700px] w-full overflow-hidden rounded-md">
        <AMap
          aKey={props.aKey}
          securityCode={props.securityCode}
          center={props.center}
          onPickedLocationChange={location => {
            setSelected(location)
          }}
        >
          {selected && (
            <Marker
              type={EnumMarkerType.WAYPOINT}
              position={[selected.longitude, selected.latitude]}
              title={selected.poiName || selected.address || '已选位置'}
            />
          )}
        </AMap>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant={EnumVariant.OUTLINE}
          onClick={props.onCancel}
        >
          取消
        </Button>

        <Button
          semanticColor={EnumSemanticColor.DARK}
          type="button"
          onClick={() => props.onConfirm?.(selected!)}
        >
          确认
        </Button>
      </DialogFooter>
    </>
  )
}
