import { enumToOptions } from '@kilnonedre/foundation'

// 字段类型
export const EnumType = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  DATE: 'DATE',
  DATETIME: 'DATETIME',
  BOOLEAN: 'BOOLEAN',
} as const

export type EnumType = (typeof EnumType)[keyof typeof EnumType]

export const EnumTypeLabel: Record<EnumType, string> = {
  STRING: '文本',
  NUMBER: '数字',
  DATE: '日期',
  DATETIME: '日期时间',
  BOOLEAN: '布尔值',
}

export const enumTypeOptions = enumToOptions(EnumType, EnumTypeLabel)

export const mockValueByType = (type: EnumType): string | number | boolean => {
  switch (type) {
    case EnumType.STRING:
      return '示例文本'

    case EnumType.NUMBER:
      return 100

    case EnumType.DATE:
      return '2026-08-23'

    case EnumType.DATETIME:
      return '2026-08-23 12:00:00'

    case EnumType.BOOLEAN:
      return true
  }
}
