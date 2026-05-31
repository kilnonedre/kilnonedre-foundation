import { CommonOption } from '../type'

export const enumToOptions = <T extends string>(
  enumObj: Record<string, T>,
  labelMap: Record<T, string>
): Array<CommonOption> => {
  return Object.values(enumObj).map(value => ({
    value,
    label: labelMap[value],
  }))
}
