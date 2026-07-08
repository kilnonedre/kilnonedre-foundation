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
import {
  CommonLocation,
  EnumMarkerType,
  EnumSemanticColor,
  EnumVariant,
} from '@/type'
import type * as types from './type'

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
        const value = field.value as CommonLocation | null

        const center =
          props.center ??
          (value ? [value.longitude, value.latitude] : undefined)

        return (
          <>
            <Button
              id={id}
              type="button"
              variant={EnumVariant.OUTLINE}
              aria-invalid={fieldState.invalid}
              className="justify-start"
              onClick={() => setOpen(true)}
            >
              {value?.poiName || value?.address || '请选择位置'}
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="w-[80vw] max-w-none!">
                <DialogHeader>
                  <DialogTitle>选择地图位置</DialogTitle>
                </DialogHeader>

                <MapDialogBody
                  center={center}
                  value={value}
                  aKey={props.aKey}
                  securityCode={props.securityCode}
                  onConfirm={location => {
                    field.onChange(location)
                    props.onConfirm?.(location)
                    setOpen(false)
                  }}
                  onCancel={() => setOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </>
        )
      }}
    </FieldController>
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
