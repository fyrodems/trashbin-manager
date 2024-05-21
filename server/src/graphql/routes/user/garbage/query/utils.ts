interface wasteInMonthType {
  monthIndex: number
  month: string
  garbage_sum: number
  waste_name: string
  garbage_typeID: number
}

export const totalWeight = (object: wasteInMonthType[], type: string): number =>
  object
    .filter(({ waste_name }) => waste_name === type)
    .reduce((sum, { garbage_sum }) => {
      return sum + garbage_sum
    }, 0)

export const polishMonths = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
]
