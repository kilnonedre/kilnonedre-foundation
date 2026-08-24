import { ConfigPaperSize } from '@/print/type'
import { enumToOptions } from '@kilnonedre/foundation'

// 纸张类型
export const EnumPaperType = {
  A3: 'A3',
  A4: 'A4',
  A5: 'A5',
  B4: 'B4',
  B5: 'B5',
  RECEIPT_80MM: 'RECEIPT_80MM',
  RECEIPT_58MM: 'RECEIPT_58MM',
  WAYBILL_100X150: 'WAYBILL_100X150',
} as const

export type EnumPaperType = (typeof EnumPaperType)[keyof typeof EnumPaperType]

export const EnumPaperTypeLabel: Record<EnumPaperType, string> = {
  A3: 'A3',
  A4: 'A4',
  A5: 'A5',
  B4: 'B4',
  B5: 'B5',
  RECEIPT_80MM: '80mm小票',
  RECEIPT_58MM: '58mm小票',
  WAYBILL_100X150: '100×150面单',
}

export const EnumPaperTypeSize: Record<EnumPaperType, ConfigPaperSize> = {
  A3: {
    width: 297,
    height: 420,
  },
  A4: {
    width: 210,
    height: 297,
  },
  A5: {
    width: 148,
    height: 210,
  },
  B4: {
    width: 250,
    height: 353,
  },
  B5: {
    width: 176,
    height: 250,
  },
  RECEIPT_80MM: {
    width: 80,
    height: 200,
  },
  RECEIPT_58MM: {
    width: 58,
    height: 200,
  },
  WAYBILL_100X150: {
    width: 100,
    height: 150,
  },
}

export const enumPaperTypeOptions = enumToOptions(
  EnumPaperType,
  EnumPaperTypeLabel
)
