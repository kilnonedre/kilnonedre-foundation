import { EMAIL_REGEX } from '@/util/validator/regex'

export const isValidEmail = (string: string) => {
  return EMAIL_REGEX.test(string)
}
