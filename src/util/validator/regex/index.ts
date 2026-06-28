export const ID_CARD_REGEX = /^(?:\d{15}|\d{17}[0-9Xx])$/
export const PHONE_REGEX = /^1[3-9]\d{9}$/
export const DECIMAL_REGEX = /^\d+(\.\d{1,2})?$/
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const URL_REGEX =
  /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|\d{1,3}(\.\d{1,3}){3}(:\d+)?)(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[\d&a-zA-Z_=%.~+-]*)?(#[\d&a-zA-Z_=%.~+-]*)?$/
