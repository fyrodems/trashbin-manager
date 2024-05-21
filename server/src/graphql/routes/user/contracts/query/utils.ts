import {
  type HousingAssociationContractsType,
  type UserContractsResultType,
  type BasicContract,
} from './types'

export function mergeRatesWithTheSameContractIDs(
  initialArray: UserContractsResultType[] | HousingAssociationContractsType[]
): HousingAssociationContractsType[] | UserContractsResultType[] {
  function isHOContract(
    contract: BasicContract
  ): contract is HousingAssociationContractsType {
    return (
      (contract as HousingAssociationContractsType).dumpsterContract_ID !==
      undefined
    )
  }

  function isUsersContract(
    contract: BasicContract
  ): contract is UserContractsResultType {
    return (contract as UserContractsResultType).usersContract_ID !== undefined
  }

  // jeśli dostarczono dumpstersContracts
  if (isHOContract(initialArray[0])) {
    const resultArray: HousingAssociationContractsType[] = []

    for (const object of initialArray) {
      let contractAlreadyMerged = false
      /*  looper(newObject, resultArray, contractAlreadyMerged) */
      for (const newObject of resultArray) {
        if (
          ('dumpsterContract_ID' in object &&
            'dumpsterContract_ID' in newObject) ||
          ('usersContract_ID' in object && 'usersContract_ID' in newObject)
        ) {
          // merge keys with values
          newObject.rates = {
            ...newObject.rates,
            ...Object.fromEntries(
              Object.entries(object.rates).filter(
                ([, value]) => value !== undefined
              )
            ),
          }
          contractAlreadyMerged = true
          break // exit the loop once a matching contract is found
        }
      }

      if (!contractAlreadyMerged && isHOContract(object)) {
        resultArray.push(object)
      }
    }

    return resultArray
  }

  // jeśli nie dostarczono dumpsters Contracts, zakładamy, że sa to users Contract
  const resultArray: UserContractsResultType[] = []
  for (const object of initialArray) {
    let contractAlreadyMerged = false

    for (const newObject of resultArray) {
      if (
        ('dumpsterContract_ID' in object &&
          'dumpsterContract_ID' in newObject) ||
        ('usersContract_ID' in object && 'usersContract_ID' in newObject)
      ) {
        // merge keys with values
        newObject.rates = {
          ...newObject.rates,
          ...Object.fromEntries(
            Object.entries(object.rates).filter(
              ([, value]) => value !== undefined
            )
          ),
        }
        contractAlreadyMerged = true
        break // exit the loop once a matching contract is found
      }
    }

    if (!contractAlreadyMerged && isUsersContract(object)) {
      resultArray.push(object)
    }
  }

  return resultArray
}
