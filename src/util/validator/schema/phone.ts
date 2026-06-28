import { z } from 'zod'
import { emptyToUndefined } from '@/util/validator/empty-to-undefined'
import { PHONE_REGEX } from '@/util/validator/regex'

const buildSchema = () =>
  z
    .string({
      message: '请输入手机号',
    })
    .trim()
    .regex(PHONE_REGEX, '请输入正确的手机号')

export const zPhoneRequired = () => buildSchema()

export const zPhoneOptional = () =>
  z.preprocess(emptyToUndefined, buildSchema().optional())
