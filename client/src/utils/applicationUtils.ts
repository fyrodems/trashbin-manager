import { ApplicationStatus } from '@/types/Status'

const reverseArray = (array: any[]) => {
  if (Array.isArray(array)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return array.slice().reverse()
  }

  return []
}

const statusLabel: Record<string, string> = {
  1: 'Aktywny',
  2: 'Zablokowany',
  3: 'Do zatwierdzenia',
  4: 'Aktywna',
  5: 'Zablokowana',
  6: 'Do zatwierdzenia',
  7: 'Aktywne',
  8: 'Nieaktywne',
  9: 'Oczekujący',
  10: 'Zatwierdzony',
  11: 'Odrzucony',
  12: 'Anulowany',
  13: 'Aktualna',
  14: 'Historyczna',
  15: 'Aktualny',
  16: 'Historyczny',
  17: 'Aktualny',
  18: 'Historyczny',
  19: 'Oczekujący',
  20: 'Zatwierdzony',
  21: 'Odrzucony',
  22: 'Aktywny',
  23: 'Historyczny',
  24: 'Aktywny',
  25: 'Oczekujący',
  26: 'Historyczny',
  27: 'Aktywna',
  28: 'Nieaktywna',
}

const generateTypeLabel = (typeID: number) => {
  switch (typeID) {
    case 16: {
      return 'Wniosek o nową kartę'
    }

    case 17: {
      return 'Dodanie adresu'
    }

    case 18: {
      return 'Usunięcie adresu'
    }

    case 19: {
      return 'Edycja adresu'
    }

    case 20: {
      return 'Dodanie altany do karty'
    }

    case 21: {
      return 'Edycja danych personalnych'
    }

    case 22: {
      return 'Blokada karty'
    }

    case 23: {
      return 'Usunięcie dostępu do altany'
    }

    default: {
      return ''
    }
  }
}

const generateDateLabel = (inputDate: string) => {
  const date = new Date(inputDate)
  const day = date.getUTCDate()

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

const generateAddressTypeLabel = (inputAddress: number) => {
  switch (inputAddress) {
    case 1: {
      return 'korespondencyjnego'
    }

    case 2: {
      return 'zamieszkania'
    }

    case 3: {
      return 'zameldowania'
    }

    default: {
      return ''
    }
  }
}

const isChecked = (statusID: number) =>
  statusID === ApplicationStatus.REJECTED ||
  statusID === ApplicationStatus.APPROVED

export {
  reverseArray,
  statusLabel,
  generateTypeLabel,
  generateDateLabel,
  generateAddressTypeLabel,
  isChecked,
}
