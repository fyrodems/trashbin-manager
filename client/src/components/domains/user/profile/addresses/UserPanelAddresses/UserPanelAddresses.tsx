import { useState } from 'react'
import { Button, Descriptions, Radio, type RadioChangeEvent } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { UserCreateAddressForm } from '../UserCreateAddressForm/UserCreateAddressForm'
import { UserDeleteAddressInfoForm } from '../UserDeleteAddressForm/UserDeleteAddressForm'
import { UserEditAddressForm } from '../UserEditAddressForm/UserEditAddressForm'
import { type UserPanelAddressProps } from '../../userProfileInterfaces'
import styles from './UserPanelAddresses.module.scss'
import { toggleState } from '@/utils/functions'
import { AddressType } from '@/types/AddressType'

const { Item } = Descriptions

export const UserPanelAddresses: React.FC<UserPanelAddressProps> = ({
  usersData,
}) => {
  const [selectedTypeId, setSelectedTypeId] = useState<string>('3')
  const [isNewAddressOpen, setIsNewAddressOpen] = useState<boolean>(false)

  const userAddressTypes = usersData.addressInfo?.map(
    (address) => address.usersAddress_typeID
  )

  const addressesList = usersData.addressInfo
    ? usersData.addressInfo
        .filter(
          (address) => address.usersAddress_typeID === Number(selectedTypeId)
        )
        .map((address) => (
          <div key={address?.usersAddress_ID}>
            <Descriptions
              labelStyle={{
                width: window.innerWidth < 576 ? '100px' : '170px',
              }}
              column={2}
              className={styles.firstDescription}
            >
              <Item>
                <div className={styles.dataContent}>
                  <p className={styles.dataLabel}>Ulica</p>
                  <p className={styles.dataText}>
                    {address?.usersAddress_street}
                  </p>
                </div>
              </Item>
              <Item>
                <div className={styles.dataContent}>
                  <p className={styles.dataLabel}>Numer budynku</p>
                  <p className={styles.dataText}>
                    {address?.usersAddress_houseNumber}{' '}
                    {address?.usersAddress_apartamentNumber
                      ? `/${address?.usersAddress_apartamentNumber}`
                      : null}
                  </p>
                </div>
              </Item>
              <Item>
                <div className={styles.dataContent}>
                  <p className={styles.dataLabel}>Kod pocztowy</p>
                  <p className={styles.dataText}>
                    {address?.usersAddress_postCode}
                  </p>
                </div>
              </Item>
              <Item>
                <div className={styles.dataContent}>
                  <p className={styles.dataLabel}>Miasto</p>
                  <p className={styles.dataText}>
                    {address?.usersAddress_city}
                  </p>
                </div>
              </Item>
            </Descriptions>

            <div className={styles.buttonsWrapper}>
              <div className={styles.centerButtonsWrapper}>
                {address ? (
                  <Button
                    type={'default'}
                    onClick={() => {
                      toggleState(isNewAddressOpen, setIsNewAddressOpen)
                    }}
                    disabled={
                      userAddressTypes?.includes(1) &&
                      userAddressTypes?.includes(2) &&
                      userAddressTypes?.includes(3)
                    }
                  >
                    <HomeOutlined />
                    {isNewAddressOpen
                      ? 'Anuluj dodawanie adresu'
                      : 'Dodaj nowy adres'}
                  </Button>
                ) : null}

                {address.usersAddress_typeID !==
                  AddressType.REGISTERED_ADRESS && (
                  <UserDeleteAddressInfoForm
                    userID={usersData?.basicInfo!.users_ID}
                    addressID={address.usersAddress_ID}
                  />
                )}
              </div>
              {usersData?.basicInfo ? (
                <UserEditAddressForm
                  userID={usersData?.basicInfo?.users_ID}
                  addressData={address}
                />
              ) : null}
            </div>
          </div>
        ))
    : []

  const onChange = (e: RadioChangeEvent) => {
    setSelectedTypeId(e.target.value as string)
  }

  const sortOptions = [
    { label: 'Korespondencyjny', value: '1' },
    { label: 'Zamieszkania', value: '2' },
    { label: 'Zameldowania', value: '3' },
  ]

  return (
    <div className={styles.section}>
      <div className={styles.addressHeaders}>
        <h3>Twoje adresy</h3>

        <Radio.Group
          className={styles.groupRadio}
          options={sortOptions}
          onChange={onChange}
          value={selectedTypeId}
          optionType="button"
        />
      </div>
      {usersData.addressInfo && usersData?.basicInfo ? (
        <UserCreateAddressForm
          addressInfo={usersData.addressInfo}
          userID={usersData?.basicInfo?.users_ID}
          isOpen={isNewAddressOpen}
        />
      ) : (
        <div>Brak danych adresowych!</div>
      )}

      <ul>
        {addressesList.length > 0 ? (
          addressesList
        ) : (
          <li className={styles.noAddressInfo}>
            {`Nie masz adresu o wskazanym typie `}
            <Button
              type={'default'}
              onClick={() => {
                toggleState(isNewAddressOpen, setIsNewAddressOpen)
              }}
              disabled={
                userAddressTypes?.includes(1) &&
                userAddressTypes?.includes(2) &&
                userAddressTypes?.includes(3)
              }
            >
              <HomeOutlined />
              {isNewAddressOpen
                ? 'Anuluj dodawanie adresu'
                : 'Dodaj nowy adres'}
            </Button>
          </li>
        )}
      </ul>
    </div>
  )
}
