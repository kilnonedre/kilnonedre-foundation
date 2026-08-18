// Input 类型
export const EnumInputType = {
  TEXT: 'text',
  PASSWORD: 'password',
  NUMBER: 'number',
} as const

export type EnumInputType = (typeof EnumInputType)[keyof typeof EnumInputType]

export const EnumInputTypeLabel: Record<EnumInputType, string> = {
  text: '文本',
  password: '密码',
  number: '数字',
}
