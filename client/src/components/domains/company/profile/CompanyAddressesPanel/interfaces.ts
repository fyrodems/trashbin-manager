interface Address {
  usersAddress_ID: number
  usersAddress_userID: number
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_typeID: number
  usersAddress_communityID: number
  usersAddress_statusID: number
}

interface CompanyAddressPanelProps {}

interface CompanyAddressDeleteProps {
  address: {
    usersAddress_ID: string
    usersAddress_userID: string
  }
  refetch: () => void
}

interface CompanyAddressEditMutationProps {}

interface CompanyAddressAddMutationProps {}

export type {
  Address,
  CompanyAddressPanelProps,
  CompanyAddressDeleteProps,
  CompanyAddressEditMutationProps,
  CompanyAddressAddMutationProps,
}
