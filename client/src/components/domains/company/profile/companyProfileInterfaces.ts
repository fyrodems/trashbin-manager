export interface AddAddressFormValues {
  voivodeship: string
  municipality: string
  usersAddress_communityID: string
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string | null
  usersAddress_postCode: string
  usersAddress_city: string
}

export interface CompanyAddressAddProps {
  refetch: () => void
}

export interface AddAddressFormValues {
  voivodeship: string
  municipality: string
  usersAddress_communityID: string
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string | null
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
}

export interface CompanyAddressAddProps {
  initialValues: AddAddressFormValues
  refetch: () => void
}
