import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { App, Descriptions, Radio, type RadioChangeEvent } from 'antd'
import { OfficialDeleteAddressInfo } from '../OfficialDeleteAddressInfo/OfficialDeleteAddressInfo'
import { OfficialEditAddressForm } from '../OfficialEditAddressForm/OfficialEditAddressForm'
import type {
  OfficialPanelAddressProps,
  AddressInfoValues,
  AddressInfoInitialValues,
} from '../addressesInterfaces'
import { OfficialCreateAddressForm } from '../../OfficialCreateAddressForm/OfficialCreateAddressForm'
import styles from './OfficialPanelAddress.module.scss'
import { graphql } from '@/gql'

const { Item } = Descriptions

const editUserAddressMutation = graphql(`
  mutation OfficialAddressInfoEdit(
    $props: OfficialAddressInfoEditMutationProps!
  ) {
    official {
      address {
        edit(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const OfficialPanelAddress: React.FC<OfficialPanelAddressProps> = ({
  userInfoData,
  refetch,
}) => {
  const [update] = useMutation(editUserAddressMutation)
  const [selectedTypeId, setSelectedTypeId] = useState<string>('3')
  const { message } = App.useApp()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const addresses = userInfoData.addressInfo
    ?.filter(
      (address) => address?.usersAddress_typeID === Number(selectedTypeId)
    )
    .map((address) => {
      const initialValues: AddressInfoInitialValues = {
        usersAddress_ID: address?.usersAddress_ID,
        usersAddress_street: address?.usersAddress_street ?? '',
        usersAddress_houseNumber: address?.usersAddress_houseNumber ?? '',
        usersAddress_apartamentNumber:
          address?.usersAddress_apartamentNumber ?? '',
        usersAddress_postCode: address?.usersAddress_postCode ?? '',
        usersAddress_city: address?.usersAddress_city ?? '',
        usersAddress_typeID: address?.usersAddress_typeID,
        usersAddress_communityID: address?.usersAddress_communityID,
      }

      const onSubmit = async (values: AddressInfoValues) => {
        const { usersAddress_communityID, usersAddress_apartamentNumber } =
          values

        const { data } = await update({
          variables: {
            props: {
              usersAddress_ID: values.usersAddress_ID,
              usersAddress_city: values.usersAddress_city,
              usersAddress_houseNumber: values.usersAddress_houseNumber,
              usersAddress_postCode: values.usersAddress_postCode,
              usersAddress_street: values.usersAddress_street,
              usersAddress_typeID: values.usersAddress_typeID,
              usersAddress_communityID,
              usersAddress_apartamentNumber:
                usersAddress_apartamentNumber ?? null,
            },
          },
        })

        const status = data?.official?.address?.edit?.status?.message

        if (status === 'Success') {
          await message.success('Poprawnie zmieniono dane adresowe')
          setIsModalOpen(false)
        } else {
          await message.error('Wystąpił błąd')
        }

        await refetch()
      }

      return (
        <div key={address?.usersAddress_ID}>
          <Descriptions
            labelStyle={{ width: window.innerWidth < 576 ? '100px' : '170px' }}
            column={2}
            className={styles.firstDescription}
          >
            <Item>
              <div className={styles.dataContent}>
                <p className={styles.dataLabel}>Ulica</p>
                <p
                  className={styles.dataText}
                  onClick={() => {
                    setIsModalOpen(true)
                  }}
                >
                  {address?.usersAddress_street}
                </p>
              </div>
            </Item>
            <Item>
              <div className={styles.dataContent}>
                <p className={styles.dataLabel}>Numer budynku</p>
                <p
                  className={styles.dataText}
                  onClick={() => {
                    setIsModalOpen(true)
                  }}
                >
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
                <p
                  className={styles.dataText}
                  onClick={() => {
                    setIsModalOpen(true)
                  }}
                >
                  {address?.usersAddress_postCode}
                </p>
              </div>
            </Item>
            <Item>
              <div className={styles.dataContent}>
                <p className={styles.dataLabel}>Miasto</p>
                <p
                  className={styles.dataText}
                  onClick={() => {
                    setIsModalOpen(true)
                  }}
                >
                  {address?.usersAddress_city}
                </p>
              </div>
            </Item>
          </Descriptions>

          <div className={styles.buttonsWrapper}>
            <div className={styles.centerButtonsWrapper}>
              <OfficialCreateAddressForm
                userData={userInfoData}
                refetch={refetch}
              />

              {userInfoData.basicInfo?.users_ID && address ? (
                <OfficialDeleteAddressInfo
                  usersAddress_ID={address.usersAddress_ID}
                  usersAddress_userID={userInfoData.basicInfo.users_ID}
                  refetch={refetch}
                />
              ) : null}
            </div>
            {address ? (
              <OfficialEditAddressForm
                onSubmit={onSubmit}
                initialValues={initialValues}
                address={address}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            ) : null}
          </div>
        </div>
      )
    })

  const onChange = (e: RadioChangeEvent) => {
    setSelectedTypeId(e.target.value as string)
  }

  const sortOptions = [
    { label: 'Zameldowania', value: '3' },
    { label: 'Zamieszkania', value: '2' },
    { label: 'Korespondencyjny', value: '1' },
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
      <>
        {addresses !== undefined && addresses.length > 0 ? (
          addresses
        ) : (
          <li
            className={styles.noAddressInfo}
          >{`Użytkownik nie ma adresu o wskazanym typie`}</li>
        )}
      </>
    </>
  )
}
