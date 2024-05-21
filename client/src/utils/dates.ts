export function getFirstDayLastYear(): string {
  const today: Date = new Date()
  const twelveMonthsAgo: Date = new Date(today)

  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
  twelveMonthsAgo.setDate(1)

  const year: number = twelveMonthsAgo.getFullYear()
  let month: string = (twelveMonthsAgo.getMonth() + 2)
    .toString()
    .padStart(2, '0')

  if (month === '13') {
    month = '01'
  }

  const day = '01'

  return `${year}-${month}-${day}`
}

export const parseDate = (date: string | undefined) => {
  if (!date) return 'Brak danych'

  const parsedDate = new Date(date).toLocaleDateString('pl-PL')
  return parsedDate
}
