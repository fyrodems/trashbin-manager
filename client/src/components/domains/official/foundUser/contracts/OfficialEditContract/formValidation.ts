import { type EditContractValidationValues } from '../contractsInterfaces'
import { validationMessages } from '@/utils/validationMessages'

export const validateContractInfo = (values: EditContractValidationValues) => {
  const { required } = validationMessages

  const errors = {
    usersContract_number: values.usersContract_number ? undefined : required,
    usersContract_dateFrom: values.usersContract_dateFrom
      ? undefined
      : required,
    usersContract_dateTo: values.usersContract_dateTo ? undefined : required,
    usersContract_ratePaper: values.usersContract_ratePaper
      ? undefined
      : required,
    usersContract_ratePlastic: values.usersContract_ratePlastic
      ? undefined
      : required,
    usersContract_rateGlass: values.usersContract_rateGlass
      ? undefined
      : required,
    usersContract_rateBio: values.usersContract_rateBio ? undefined : required,
    usersContract_rateMixed: values.usersContract_rateMixed
      ? undefined
      : required,
  }

  return errors
}
