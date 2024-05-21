import { type RateInfoType } from '@/gql/commonTypes'

interface SelectOption {
  label: string
  value: string
}

export function getGarbageTypeIds(obj: RateInfoType[]): number[] {
  if (!obj) {
    console.error('Invalid input object or empty array.')
    return []
  }

  const garbageTypeIds: number[] = obj.map((item) => item.rate_typeID)

  return garbageTypeIds
}

export function filterRatesTypes(
  selectOptions: SelectOption[],
  garbageTypeIds: number[]
): SelectOption[] {
  const filteredOptions = selectOptions.filter(
    (option) => !garbageTypeIds.includes(Number(option.value))
  )

  return filteredOptions
}
