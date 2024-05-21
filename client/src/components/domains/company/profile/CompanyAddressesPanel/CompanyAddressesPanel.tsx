import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import {
  Descriptions,
  Divider,
  Pagination,
  Radio,
  type RadioChangeEvent,
} from 'antd'
import { CompanyAddressDelete } from '../CompanyAddressDelete/CompanyAddressDelete'
import { CompanyAddressAdd } from '../CompanyAddressAdd/CompanyAddressAdd'
import { CompanyAddressEdit } from '../CompanyAddressEdit/CompanyAddressEdit'
import { type Address, type CompanyAddressPanelProps } from './interfaces'
import styles from './CompanyAddressPanel.module.scss'
import { graphql } from '@/gql'
import { useAuth } from '@/auth/authProvider'
import { UserType } from '@/types/UserType'
import { AddressType } from '@/types/AddressType'

const { Item } = Descriptions

const findAddressesQuery = graphql(`
  query CompanyOccupantsGet {
    company {
      addresses {
        get {
          usersAddress_ID
          usersAddress_userID
          usersAddress_street
          usersAddress_houseNumber
          usersAddress_apartamentNumber
          usersAddress_postCode
          usersAddress_city
          usersAddress_typeID
          usersAddress_communityID
          usersAddress_statusID
        }
      }
    }
  }
`)

export const CompanyAddressPanel: React.FC<CompanyAddressPanelProps> = () => {
  const { data, refetch } = useQuery(findAddressesQuery)
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedTypeId, setSelectedTypeId] = useState<string>('24')
  const isHousingAssosiation = user?.userType === UserType.HOUSING_ASSOCIATION
  const pageSize = 3

  useEffect(() => {
    if (data?.company?.addresses?.get) {
      setAddresses(data?.company?.addresses?.get)
    }
  }, [data])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const displayedAddresses = addresses.filter(
    (address) => address?.usersAddress_typeID === Number(selectedTypeId)
  )

  const startIdx = (currentPage - 1) * pageSize
  const endIdx = currentPage * pageSize
  const paginatedAddresses = displayedAddresses.slice(startIdx, endIdx)

  const onChange = (e: RadioChangeEvent) => {
    setSelectedTypeId(e.target.value as string)
  }

  const sortOptions = [
    { label: 'Główny', value: '24' },
    { label: 'Oddziały', value: '25' },
  ]
  return (
    <>
      <div className={styles.addressHeaders}>
        <h3>Adresy użytkownika</h3>
        <Radio.Group
          className={styles.groupRadio}
          options={sortOptions}
          onChange={(e) => {
            onChange(e)
          }}
          value={selectedTypeId}
          optionType="button"
        />
      </div>

      {paginatedAddresses.length > 0 ? (
        paginatedAddresses.map((a) => (
          <div key={a.usersAddress_ID} style={{ marginBottom: '1rem' }}>
            {paginatedAddresses.length > 1 && !isHousingAssosiation && (
              <>
                {a.usersAddress_typeID ===
                  AddressType.COMPANY_ADRESS_FOR_DELIVERY && (
                  <Divider>Adres główny</Divider>
                )}
                {a.usersAddress_typeID === AddressType.COMPANY_ADRESS && (
                  <Divider />
                )}
              </>
            )}
            <Descriptions
              labelStyle={{
                width: window.innerWidth < 576 ? '130px' : '200px',
              }}
              size="small"
              column={2}
              className={styles.firstDescription}
            >
              <Item>
                <div className={styles.dataContent}>
                  <p className={styles.dataLabel}>Ulica</p>
                  <p className={styles.dataText}>{a.usersAddress_street}</p>
                </div>
              </Item>
              <Item>
                <div className={styles.dataContent}>
                  <p className={styles.dataLabel}>Numer budynku</p>
                  <p className={styles.dataText}>
                    {a?.usersAddress_houseNumber}{' '}
                    {a?.usersAddress_apartamentNumber
                      ? `/${a?.usersAddress_apartamentNumber}`
                      : null}
                  </p>
                </div>
              </Item>
              <Item>
                <div className={styles.dataContent}>
                  <p className={styles.dataLabel}>Kod pocztowy</p>
                  <p className={styles.dataText}>{a.usersAddress_postCode}</p>
                </div>
              </Item>
              <Item>
                <div className={styles.dataContent}>
                  <p className={styles.dataLabel}>Miejscowość</p>
                  <p className={styles.dataText}>{a.usersAddress_city}</p>
                </div>
              </Item>
            </Descriptions>

            <div className={styles.buttonsWrapper}>
              {isHousingAssosiation || a.usersAddress_typeID === 24 ? null : (
                <CompanyAddressDelete address={a} refetch={refetch} />
              )}

              <CompanyAddressEdit addressData={a} refetch={refetch} />
            </div>
          </div>
        ))
      ) : (
        <ul>
          <li className={styles.noAddress}>
            Nie znaleziono pasujacych adresów
          </li>
        </ul>
      )}

      {!isHousingAssosiation && <CompanyAddressAdd refetch={refetch} />}
      {!isHousingAssosiation && (
        <Pagination
          current={currentPage}
          total={addresses.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          className={styles.pagination}
        />
      )}
    </>
  )
}
