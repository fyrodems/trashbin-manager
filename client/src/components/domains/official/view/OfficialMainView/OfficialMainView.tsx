import { Divider, Tabs } from 'antd'
import { Form } from 'react-final-form'
import { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { OfficialApplicationCards } from '../../applications/OfficialApplicationCards/OfficialApplicationCards'
import { OfficialApplicationDeleteAddress } from '../../applications/OfficialApplicationDeleteAddress/OfficialApplicationDeleteAddress'
import { OfficialApplicationDumpsterAdd } from '../../applications/OfficialApplicationDumpsterAdd/OfficialApplicationDumpsterAdd'
import { OfficialApplicationEditAddress } from '../../applications/OfficialApplicationEditAddressForm/OfficialApplicationEditAddressForm'
import { OfficialApplicationEditPersonalData } from '../../applications/OfficialApplicationEditPersonalData/OfficialApplicationEditPersonalData'
import { OfficialApplicationNewAddress } from '../../applications/OfficialApplicationNewAddress/OfficialApplicationNewAddress'
import { OfficialApplicationNewUsers } from '../../applications/OfficialApplicationNewUsers/OfficialApplicationNewUsers'
import styles from './OfficialMainView.module.scss'
import {
  officialApplicationNewUsersQuery,
  officialApplicationEditUserInfoQuery,
  officialApplicationCardsQuery,
  officialApplicationDumpsterAddQuery,
  officialApplicationNewAddressQuery,
  officialApplicationEditAddressQuery,
  officialApplicationDeleteAddressQuery,
} from './applicationsQueries'
import { isMobileWidth } from '@/utils/functions'
import { Input } from '@/components/domains/common/Input'
import { ActionType } from '@/types/ActionType'

export const OfficialView: React.FC = () => {
  const [searchData, setSearchData] = useState<string | undefined>(undefined)
  const [numOfApplications, setNumOfApplications] = useState({
    newUsers: 0,
    personalChanges: 0,
    newCards: 0,
    dumpstersAccess: 0,
    newAddresses: 0,
    addressChanges: 0,
    addressDeletes: 0,
  })

  const queryVariables = {
    variables: {
      props: {
        users_data: searchData ?? undefined,
      },
    },
  }

  const {
    data: newUsersData,
    loading: newUsersLoading,
    refetch: newUsersRefetch,
  } = useQuery(officialApplicationNewUsersQuery, queryVariables)

  const { data: newPersonalChangesData, refetch: newPersonalChangesRefetch } =
    useQuery(officialApplicationEditUserInfoQuery, queryVariables)

  const {
    data: newCardsData,
    loading: newCardsLoading,
    refetch: newCardsRefetch,
  } = useQuery(officialApplicationCardsQuery, queryVariables)

  const { data: newDumpstersData, refetch: newDumpstersRefetch } = useQuery(
    officialApplicationDumpsterAddQuery,
    queryVariables
  )

  const { data: newAddressData, refetch: newAddressRefetch } = useQuery(
    officialApplicationNewAddressQuery,
    queryVariables
  )

  const { data: addressChangeData, refetch: addressChangeRefetch } = useQuery(
    officialApplicationEditAddressQuery,
    queryVariables
  )

  const {
    data: addressDeletesData,
    loading: addressDeletesLoading,
    refetch: addressDeletesRefetch,
  } = useQuery(officialApplicationDeleteAddressQuery, queryVariables)

  useEffect(() => {
    const response = newUsersData?.official?.applications?.newUser?.get
    if (response) {
      setNumOfApplications((state) => ({ ...state, newUsers: response.length }))
    }
  }, [newUsersData])

  useEffect(() => {
    const response =
      newPersonalChangesData?.official?.applications?.userInfo?.get
    if (response) {
      // wyświetl tylko wnioski o edycję danych personalnych
      setNumOfApplications((state) => ({
        ...state,
        personalChanges: response.filter(
          (a) =>
            a.personalDataApplications_typeID === ActionType.EDIT_PERSONAL_DATA
        ).length,
      }))
    }
  }, [newPersonalChangesData])

  useEffect(() => {
    const response = newCardsData?.official?.applications?.cards?.get
    if (response) {
      setNumOfApplications((state) => ({ ...state, newCards: response.length }))
    }
  }, [newCardsData])

  useEffect(() => {
    const response = newDumpstersData?.official?.applications?.dumpsters?.get
    if (response) {
      // wyświetl tylko wnioski o dodanie do karty
      setNumOfApplications((state) => ({
        ...state,
        dumpstersAccess: response.filter(
          (a) =>
            a.dumpstersApplications_typeID ===
            ActionType.ADD_DUMPSTER_TO_THE_CARD
        ).length,
      }))
    }
  }, [newDumpstersData])

  useEffect(() => {
    const response = newAddressData?.official?.applications?.addressInfo?.get
    if (response) {
      // wyświetl tylko wnioski o dodanie adresu
      setNumOfApplications((state) => ({
        ...state,
        newAddresses: response.filter(
          (a) => a.addressApplications_typeID === ActionType.ADD_ADRESS
        ).length,
      }))
    }
  }, [newAddressData])

  useEffect(() => {
    const response = addressChangeData?.official?.applications?.addressInfo?.get
    if (response) {
      setNumOfApplications((state) => ({
        ...state,
        addressChanges: response.filter(
          (a) => a.addressApplications_typeID === ActionType.EDIT_ADRESS
        ).length,
      }))
    }
  }, [addressChangeData])

  useEffect(() => {
    const response =
      addressDeletesData?.official?.applications?.addressInfo?.get
    if (response) {
      // wyświetl tylko wnioski o usunięcie adresu
      setNumOfApplications((state) => ({
        ...state,
        addressDeletes: response.filter(
          (a) => a.addressApplications_typeID === ActionType.REMOVE_ADRESS
        ).length,
      }))
    }
  }, [addressDeletesData])

  const debounce = (func: { (e: any): void; apply?: any }, timeout = 750) => {
    let timer: string | number | NodeJS.Timeout | undefined
    return (...args: any) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        func.apply(this, args)
      }, timeout)
    }
  }

  return (
    <main>
      <div>
        <Divider className={styles.title}>
          Zmiany oczekujące na potwierdzenie
        </Divider>

        <Form onSubmit={() => undefined}>
          {({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              onChange={debounce((e) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                e.target.value === ''
                  ? setSearchData(undefined)
                  : setSearchData(e.target.value as string)
              })}
            >
              <div className={styles.inputWrapper}>
                <Input
                  withGradient
                  name="users_data"
                  placeholder={
                    <span className={styles.search}>
                      <SearchOutlined />
                      Szukaj
                    </span>
                  }
                  type="text"
                />
              </div>
            </form>
          )}
        </Form>

        <Tabs
          tabPosition={'top'}
          className={styles.tabs}
          centered={isMobileWidth() ? undefined : true}
          items={[
            {
              key: '1',
              label: `Nowi użytkownicy${
                numOfApplications.newUsers === 0
                  ? ''
                  : ` (${numOfApplications.newUsers})`
              }`,
              children: (
                <OfficialApplicationNewUsers
                  data={newUsersData}
                  loading={newUsersLoading}
                  refetch={newUsersRefetch}
                />
              ),
            },
            {
              key: '2',
              label: `Dane personalne${
                numOfApplications.personalChanges === 0
                  ? ''
                  : ` (${numOfApplications.personalChanges})`
              }`,
              children: (
                <OfficialApplicationEditPersonalData
                  data={newPersonalChangesData}
                  refetch={newPersonalChangesRefetch}
                />
              ),
            },
            {
              key: '3',
              label: `Nowe karty${
                numOfApplications.newCards === 0
                  ? ''
                  : ` (${numOfApplications.newCards})`
              }`,
              children: (
                <OfficialApplicationCards
                  data={newCardsData}
                  loading={newCardsLoading}
                  refetch={newCardsRefetch}
                />
              ),
            },
            {
              key: '4',
              label: `Dostęp do altan${
                numOfApplications.dumpstersAccess === 0
                  ? ''
                  : ` (${numOfApplications.dumpstersAccess})`
              }`,
              children: (
                <OfficialApplicationDumpsterAdd
                  data={newDumpstersData}
                  refetch={newDumpstersRefetch}
                />
              ),
            },
            {
              key: '5',
              label: `Nowe adresy${
                numOfApplications.newAddresses === 0
                  ? ''
                  : ` (${numOfApplications.newAddresses})`
              }`,
              children: (
                <OfficialApplicationNewAddress
                  data={newAddressData}
                  refetch={newAddressRefetch}
                />
              ),
            },
            {
              key: '6',
              label: `Zmiany adresów${
                numOfApplications.addressChanges === 0
                  ? ''
                  : ` (${numOfApplications.addressChanges})`
              }`,
              children: (
                <OfficialApplicationEditAddress
                  data={addressChangeData}
                  refetch={addressChangeRefetch}
                />
              ),
            },
            {
              key: '7',
              label: `Usuwanie adresów${
                numOfApplications.addressDeletes === 0
                  ? ''
                  : ` (${numOfApplications.addressDeletes})`
              }`,
              children: (
                <OfficialApplicationDeleteAddress
                  data={addressDeletesData}
                  loading={addressDeletesLoading}
                  refetch={addressDeletesRefetch}
                />
              ),
            },
          ]}
        />
      </div>
    </main>
  )
}
