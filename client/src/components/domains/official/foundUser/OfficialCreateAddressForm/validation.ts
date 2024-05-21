import { type OfficialCreateAddressFormValidationValues } from '../officialFoundUserInterfaces'
import useValidateForms from '@/components/domains/guest/hooks/useValidateForms'
import { validationMessages } from '@/utils/validationMessages'

export const validateAddressInfo = (
  values: Partial<OfficialCreateAddressFormValidationValues>
) => {
  const { required, wrongPostCode } = validationMessages
  const { checkPostCode } = useValidateForms()

  const errors: Partial<
    Record<keyof OfficialCreateAddressFormValidationValues, string>
  > = {
    usersAddress_street: values.usersAddress_street ? undefined : required,
    usersAddress_houseNumber: values.usersAddress_houseNumber
      ? undefined
      : required,
    usersAddress_postCode: values.usersAddress_postCode
      ? checkPostCode(values.usersAddress_postCode)
        ? undefined
        : wrongPostCode
      : required,
    usersAddress_city: values.usersAddress_city ? undefined : required,
    usersAddress_typeID: values.usersAddress_typeID ? undefined : required,

    voivodeship: values.voivodeship ? undefined : required,
    municipality: values.municipality ? undefined : required,
    usersAddress_communityID: values.usersAddress_communityID
      ? undefined
      : required,
  }

  return errors
}
