import { useState } from 'react'
import { type Garbage, type YearlyGarbages } from '../interfaces/userInterfaces'

interface ActualMonthGarbagesWeight {
  papier: number
  bioodpady: number
  metaleITworzywa: number
  szklo: number
  zmieszane: number
  total: number
}

interface ActualYearGarbagesWeight {
  January: ActualMonthGarbagesWeight
  February: ActualMonthGarbagesWeight
  March: ActualMonthGarbagesWeight
  April: ActualMonthGarbagesWeight
  May: ActualMonthGarbagesWeight
  June: ActualMonthGarbagesWeight
  July: ActualMonthGarbagesWeight
  August: ActualMonthGarbagesWeight
  September: ActualMonthGarbagesWeight
  October: ActualMonthGarbagesWeight
  November: ActualMonthGarbagesWeight
  December: ActualMonthGarbagesWeight
}

function useGarbageWeight() {
  const [weights, setWeights] = useState({
    papier: 0,
    bioodpady: 0,
    metaleITworzywa: 0,
    szklo: 0,
    zmieszane: 0,
    total: 0,
  })

  const [actualYearGarbages, setActualYearGarbages] = useState<YearlyGarbages>({
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  })

  const [actualYearWeights, setActualYearWeights] = useState({
    January: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    February: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    March: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    April: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    May: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    June: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    July: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    August: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    September: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    October: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    November: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },

    December: {
      papier: 0,
      bioodpady: 0,
      metaleITworzywa: 0,
      szklo: 0,
      zmieszane: 0,
      total: 0,
    },
  } as ActualYearGarbagesWeight)

  const getGarbagesByMonth = () => {
    const returnWeights = (array: Garbage[]) => {
      const garbageWeight = {
        papier: 0,
        bioodpady: 0,
        metaleITworzywa: 0,
        szklo: 0,
        zmieszane: 0,
        total: 0,
      }
      array.map((g) => {
        switch (g.garbage_typeID) {
          case 11: {
            garbageWeight.papier += g.garbage_sum

            break
          }

          case 12: {
            garbageWeight.bioodpady += g.garbage_sum

            break
          }

          case 13: {
            garbageWeight.metaleITworzywa += g.garbage_sum

            break
          }

          case 14: {
            garbageWeight.szklo += g.garbage_sum

            break
          }

          case 15: {
            garbageWeight.zmieszane += g.garbage_sum

            break
          }
          // No default
        }

        if (g.garbage_sum) {
          garbageWeight.total += g.garbage_sum
        }

        return null
      })

      return garbageWeight
    }

    setActualYearWeights({
      January: returnWeights(actualYearGarbages.January),
      February: returnWeights(actualYearGarbages.February),
      March: returnWeights(actualYearGarbages.March),
      April: returnWeights(actualYearGarbages.April),
      May: returnWeights(actualYearGarbages.May),
      June: returnWeights(actualYearGarbages.June),
      July: returnWeights(actualYearGarbages.July),
      August: returnWeights(actualYearGarbages.August),
      September: returnWeights(actualYearGarbages.September),
      October: returnWeights(actualYearGarbages.October),
      November: returnWeights(actualYearGarbages.November),
      December: returnWeights(actualYearGarbages.December),
    })
  }

  return {
    weights,
    setWeights,
    actualYearGarbages,
    setActualYearGarbages,
    actualYearWeights,
    getGarbagesByMonth,
  }
}

export default useGarbageWeight
