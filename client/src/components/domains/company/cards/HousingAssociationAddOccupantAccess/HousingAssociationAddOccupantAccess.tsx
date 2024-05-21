import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { App, Button } from 'antd'
import { Form } from 'react-final-form'
import { type HousingAssociationOperationsProps } from '../interfaces'
import { graphql } from '@/gql'
import { type OfficialUserOccupantSearchType } from '@/gql/commonTypes'
import { Select } from '@/components/domains/common/Select'
import { FormModal } from '@/components/domains/common/FormModal'

const findOccupantsQuery = graphql(`
  query CompanyOccupantsGets {
    company {
      occupants {
        get {
          users_ID
          users_login
          users_name
          users_identificationNumber
          users_phoneNumber
          users_statusID
          connection_ID
          addresses {
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
  }
`)

const addUserToCardMutation = graphql(`
  mutation CompanyCardsRentAdd($props: CompanyCardsRentAddMutationProps!) {
    company {
      cardsRent {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const HousingAssociationAddOccupantAccess: React.FC<
  HousingAssociationOperationsProps
> = ({ cardID, userID, refetchUserData }) => {
  const { data } = useQuery(findOccupantsQuery)
  const [addUser] = useMutation(addUserToCardMutation)
  const { message } = App.useApp()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [occupants, setOccupants] = useState(
    [] as OfficialUserOccupantSearchType[]
  )

  useEffect(() => {
    if (data?.company?.occupants?.get) {
      setOccupants(data?.company?.occupants?.get)
    }
  }, [data])

  const addUserToCard = async (values) => {
    if (!cardID) {
      return message.error('Użytkownik nie może zostać dodany')
    }

    const { data } = await addUser({
      variables: {
        props: {
          cardID,
          userID: Number(values.userID),
        },
      },
    })

    await refetchUserData()
    setIsModalOpen(false)

    const status = data?.company?.cardsRent?.add?.status.message
    await (status === 'Error'
      ? message.error('Użytkownik nie może zostać dodany')
      : message.success('Dodano dostęp użytkownikowi'))
  }

  const selectOptions = occupants.map((occupant) => ({
    label: occupant.users_name,
    value: String(occupant.users_ID),
  }))

  const formNode = (
    <Form onSubmit={addUserToCard}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Select
            name="userID"
            selectOptions={selectOptions}
            placeholder="Wybierz użytkownika"
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button htmlType="submit" type="primary">
              Przypisz użytkownika
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  if (userID !== null) {
    return null
  }

  return (
    <FormModal
      popupTitle={'Dodaj dostęp użytkownikowi do karty dostępu'}
      formNode={formNode}
      buttonContent={'Dodaj dostęp użytkownikowi'}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
    />
  )
}
