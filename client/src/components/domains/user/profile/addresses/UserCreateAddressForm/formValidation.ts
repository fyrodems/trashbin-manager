import useValidateForms from '../../../hooks/useValidateForms'
import { type FormValidationAddressInfo } from '../../userProfileInterfaces'
import { validationMessages } from '@/utils/validationMessages'

export const validateAddressInfo = (
  values: Partial<FormValidationAddressInfo>
) => {
  const { required, wrongPostCode } = validationMessages

  const { checkPostCode } = useValidateForms()

  const errors: Partial<Record<keyof FormValidationAddressInfo, string>> = {
    usersAddress_typeID: values.usersAddress_typeID ? undefined : required,
    voivodeship: values.voivodeship ? undefined : required,
    municipality: values.municipality ? undefined : required,
    usersAddress_communityID: values.usersAddress_communityID
      ? undefined
      : required,

    usersAddress_postCode: values.usersAddress_postCode
      ? checkPostCode(values.usersAddress_postCode)
        ? undefined
        : wrongPostCode
      : required,

    usersAddress_city: values.usersAddress_city ? undefined : required,
    usersAddress_street: values.usersAddress_street ? undefined : required,
    usersAddress_houseNumber: values.usersAddress_houseNumber
      ? undefined
      : required,
  }

  return errors
}
