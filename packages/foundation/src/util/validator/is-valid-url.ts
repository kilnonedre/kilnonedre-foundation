import { URL_REGEX } from '@/util/validator/regex'

export const isValidURL = (string: string) => {
  return URL_REGEX.test(string)
}
