import { type DumpsterContract } from './interfaces'
import useValidateForms from '@/components/domains/user/hooks/useValidateForms'
import { validationMessages } from '@/utils/validationMessages'

export const validateContractInfo = (values: Partial<DumpsterContract>) => {
  const { required, wrongDateOrder } = validationMessages

  const { checkDateOrder } = useValidateForms()

  const errors: Partial<Record<keyof DumpsterContract, string>> = {
    dumpsterContract_dateFrom: values.dumpsterContract_dateFrom
      ? undefined
      : required,
    dumpsterContract_dateTo: values.dumpsterContract_dateTo
      ? checkDateOrder(
          values.dumpsterContract_dateFrom,
          values.dumpsterContract_dateTo
        )
        ? undefined
        : wrongDateOrder
      : required,
  }
  return errors
}
