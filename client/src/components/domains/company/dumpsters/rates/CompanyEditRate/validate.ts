import { type RateValues } from './interfaces'
import { validationMessages } from '@/utils/validationMessages'

export const validateRateInfo = (values: Partial<RateValues>) => {
  const requiredError = validationMessages.required

  const errors: Partial<Record<keyof RateValues, string>> = {
    rate_value: values.rate_value ? undefined : requiredError,
  }

  return errors
}
