import { getFirstDayLastYear } from './dates'

const currentMonthNumber = new Date().getMonth()
const previousMonth = new Date().getMonth() - 1

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const polishMonths = [
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

function getPolishMonthName(monthNameInEng: string): string {
  const englishIndex = months.indexOf(monthNameInEng)
  return englishIndex === -1 ? 'Nieznany miesiąc' : polishMonths[englishIndex]
}

function getMonthNameFromNumber(monthNumber: number): string {
  return months[monthNumber]
}

const currentMonthName = getMonthNameFromNumber(currentMonthNumber)
const previousMonthName = getMonthNameFromNumber(previousMonth)

function getLastDayOfMonth(month: number): number {
  if (month === 1) {
    return 28
    // eslint-disable-next-line no-else-return
  } else if (month === 7) {
    return 31
  } else if (month % 2 === 0) {
    return 31
  } else {
    return 30
  }
}

/* function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
} */

const getPreviousMonthGarbage = () => {
  const actualYear = new Date().getFullYear()
  const actualMonth = (new Date().getMonth() + 1).toString().padStart(2, '0')
  const lastDay = (month: number) => getLastDayOfMonth(month)
  const today = `${actualYear}-${actualMonth}-${new Date()
    .getDate()
    .toString()
    .padStart(2, '0')}`
  /*   const startOfActualMonth = `${actualYear}-${actualMonth}-01` */
  const startOfActualYear = `${actualYear}-01-01`
  const firstDayLastYear = getFirstDayLastYear()
  const startDate = `${actualYear}-${new Date().getMonth()}-01`
  const endDate = `${actualYear}-${new Date().getMonth()}-${lastDay(
    new Date().getMonth() - 1
  )}`
  return { startDate, endDate, today, startOfActualYear, firstDayLastYear }
}

export {
  months,
  currentMonthNumber,
  previousMonth,
  getMonthNameFromNumber,
  getPolishMonthName,
  currentMonthName,
  previousMonthName,
  getLastDayOfMonth,
  getPreviousMonthGarbage,
}
