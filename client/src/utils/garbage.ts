const garbageCategories = [
  'total',
  'papier',
  'bioodpady',
  'metaleITworzywa',
  'szklo',
  'zmieszane',
]

const garbageLabels = [
  'Suma',
  'Papier',
  'Bioodpady',
  'Metale i tworzywa',
  'Szkło',
  'Zmieszane',
]

function getGarbageLabel(garbageCategory: string): string {
  const categoryIndex = garbageCategories.indexOf(garbageCategory)

  return categoryIndex === -1
    ? 'Nieznana kategoria'
    : garbageLabels[categoryIndex]
}

export { garbageCategories, getGarbageLabel }

export const garbageUnitConverter = (unit: string, value: number) => {
  if (unit === 'g') return Number.parseFloat(value.toFixed(2))
  if (unit === 'kg') return Number.parseFloat((value * 0.001).toFixed(2))
  if (unit === 't') return Number.parseFloat((value * 0.000_001).toFixed(2))

  console.warn('Not supported unit convertion')
  return value
}
