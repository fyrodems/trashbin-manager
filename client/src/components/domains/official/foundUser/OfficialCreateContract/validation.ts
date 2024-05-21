import { type OfficialCreateContractValidationValues } from '../officialFoundUserInterfaces'
import { validationMessages } from '@/utils/validationMessages'

export const validateContractInfo = (
  values: OfficialCreateContractValidationValues
) => {
  const { required } = validationMessages

  const errors = {
    usersContract_number: values.usersContract_number ? undefined : required,
    usersContract_dateFrom: values.usersContract_dateFrom
      ? undefined
      : required,
    usersContract_dateTo: values.usersContract_dateTo ? undefined : required,
  }

  return errors
}
