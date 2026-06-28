import { z } from 'zod'
import { emptyToUndefined } from '@/util/validator/empty-to-undefined'
import { ID_CARD_REGEX } from '@/util/validator/regex'

const buildSchema = () =>
  z
    .string({
      message: '请输入身份证号',
    })
    .trim()
    .regex(ID_CARD_REGEX, '身份证号格式不正确')

export const zIdCardRequired = () => buildSchema()

export const zIdCardOptional = () =>
  z.preprocess(emptyToUndefined, buildSchema().optional())
