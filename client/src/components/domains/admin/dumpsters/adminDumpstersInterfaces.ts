export interface AdminDumpstersSearchQueryResult {
  dumpster_ID: number
  dumpster_name: string
  dumpster_description?: string | null
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  dumpster_hasError: boolean
  bins: Array<DumpsterBinType | null>
  owners: Array<AdminDumpstersOwnerType | null>
}

interface AdminDumpstersOwnerType {
  users_name: string
  users_ID: number
}

interface DumpsterBinType {
  dumpsterBin_ID: number
  dumpsterBin_typeID: number
}

export interface DumpstersListDataType {
  key: React.Key
  location: string
  status: string
  owner?: string
  dumpsterData: AdminDumpstersSearchQueryResult
}

export interface AdminDumpsterEditFormProps {
  open: boolean
  setOpen: (state: boolean) => void
  dumpsterData: AdminDumpstersSearchQueryResult
}

export interface AdminEditDumpsterValues {
  dumpster_name: string
  dumpster_description?: string | null
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
}

export interface AdminDumpsterUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
  dumpsterData: AdminDumpstersSearchQueryResult
}

export interface DeleteOwnerValue {
  dumpster_ID: number
  user_ID?: number
}

export interface NewDumpsterValues {
  dumpster_name: string
  dumpster_description?: string
  dumpster_street: string
  dumpster_city: string
  dumpster_postCode: string
  dumpster_communityID: number
  dumpster_houseNumbers: string
  paper_binsNumber: number
  bio_binsNumber: number
  plastic_binsNumber: number
  glass_binsNumber: number
  mixed_binsNumber: number
}

export interface AdminDumpsterCreateFormProps {
  isModalOpen: boolean
  setIsModalOpen: (state: boolean) => void
}

export interface DeleteDumpsterValue {
  dumpster_ID: number
}

export interface DumpsterUpdateProps {
  open: boolean
  setOpen: (state: boolean) => void
  dumpsterID: number
}

export interface AdminAddOwnerValues {
  users_name: string
  users_login: string
  users_phoneNumber: string
  users_identificationNumber: string
  users_password: string
  usersAddress_street: string
  usersAddress_houseNumber: string
  usersAddress_apartamentNumber?: string
  usersAddress_postCode: string
  usersAddress_city: string
  usersAddress_communityID: number
  users_typeID: number
  user_ID: number
}
