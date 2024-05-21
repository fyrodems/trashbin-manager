import { App, Button } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { Form } from 'react-final-form'
import { useEffect, useState } from 'react'
import { FormModal } from '../../../common/FormModal'
import { SelectMultiple } from '../../../common/SelectMultiple'
import {
  type CardInfo,
  type UserCreateCardFormProps,
} from '../userCardsInterfaces'
import styles from './UserCreateCardForm.module.scss'
import { isMobileWidth } from '@/utils/functions'
import { graphql } from '@/gql'
import { validationMessages } from '@/utils/validationMessages'

const commonDumpstersQuery = graphql(`
  query CommonDumpstersGet5($props: CommonDumpstersGetQueryProps!) {
    common {
      dumpsters {
        get(props: $props) {
          dumpster_ID
          dumpster_name
          dumpster_description
          dumpster_street
          dumpster_city
          dumpster_postCode
          dumpster_communityID
          dumpster_houseNumbers
          dumpster_hasError
        }
      }
    }
  }
`)

const userCardsAddMutation = graphql(`
  mutation UserCardsAdd($props: UserCardsAddMutationProps!) {
    user {
      cards {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

export const UserCreateCardForm: React.FC<UserCreateCardFormProps> = ({
  userID,
  users_communities,
}) => {
  const [add] = useMutation(userCardsAddMutation)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dumpstersOptions, setDumpstersOptions] = useState<
    Array<{ label: string; value: string }>
  >([])
  const { message } = App.useApp()
  /** get dumpsters */

  const { data } = useQuery(commonDumpstersQuery, {
    variables: { props: { communities: users_communities } },
  })

  useEffect(() => {
    const response = data?.common?.dumpsters?.get

    if (response) {
      const mappedDumpsters = response.map((dumpster) => ({
        label: dumpster.dumpster_name,
        value: dumpster.dumpster_ID.toString(),
      }))
      setDumpstersOptions(mappedDumpsters)
    }
  }, [data])

  const validateCardInfo = (values: Partial<CardInfo>) => {
    return {
      dumpstersIDs: values.dumpstersIDs
        ? undefined
        : validationMessages.required,
    }
  }

  /** add card */
  const addCard = async (values: CardInfo) => {
    const { data } = await add({
      variables: {
        props: {
          usersCards_userID: userID,
          dumpstersIDs: values.dumpstersIDs
            ? values.dumpstersIDs.map(Number)
            : [],
        },
      },
    })

    const status = data?.user?.cards?.add?.status.message

    if (status === 'Error') {
      await message.error('Masz już oczekujący wniosek o dodanie nowej karty')
    } else {
      setIsModalOpen(false)
      await message.success('Wysłano wniosek o kartę dostępu')
    }
  }

  return (
    <div className={styles.formWrapper}>
      <FormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        popupTitle={`Przypisz altanę śmietnikową do nowej karty`}
        buttonContent={isMobileWidth() ? '+' : 'Dodaj nową kartę'}
        buttonType="primary"
        formNode={
          <Form onSubmit={addCard} validate={validateCardInfo}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={styles.form}>
                <SelectMultiple
                  name="dumpstersIDs"
                  placeholder="Wybierz altanę"
                  selectOptions={dumpstersOptions}
                />

                <div className={styles.actionWrapper}>
                  <Button
                    onClick={() => {
                      setIsModalOpen(false)
                    }}
                  >
                    Anuluj
                  </Button>
                  <Button htmlType="submit" type="primary">
                    Dodaj śmietnik do karty
                  </Button>
                </div>
              </form>
            )}
          </Form>
        }
      />
    </div>
  )
}
