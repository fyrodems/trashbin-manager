import { App, Button } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { Form } from 'react-final-form'
import { useEffect, useState } from 'react'
import {
  type DumpstersInfo,
  type DumpsterFormProps,
} from '../userCardsInterfaces'
import styles from './UserAddDumpsterForm.module.scss'
import { graphql } from '@/gql'
import { validationMessages } from '@/utils/validationMessages'
import { FormModal } from '@/components/domains/common/FormModal'
import { Select } from '@/components/domains/common/Select'
import { UserType } from '@/types/UserType'

const commonDumpstersQuery = graphql(`
  query CommonDumpstersGet($props: CommonDumpstersGetQueryProps!) {
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

const userDumpstersAddMutation = graphql(`
  mutation UserDumpstersAdd($props: UserDumpstersAddMutationProps!) {
    user {
      dumpsters {
        add(props: $props) {
          status {
            message
            description
          }
        }
      }
    }
  }
`)

const companyDumpstersAddMutation = graphql(`
  mutation CompanyDumpstersAdd($props: CompanyDumpstersAddMutationProps!) {
    company {
      dumpsters {
        add(props: $props) {
          status {
            message
            description
          }
        }
      }
    }
  }
`)

export const UserAddDumpsterForm: React.FC<DumpsterFormProps> = ({
  dumpstersIDs,
  usersCards_ID,
  user_ID,
  cardNumber,
  users_communities,
  userType,
  refetchUserData,
}) => {
  const [userAdd] = useMutation(userDumpstersAddMutation)
  const [companyAdd] = useMutation(companyDumpstersAddMutation)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dumpstersOptions, setDumpstersOptions] = useState<any[]>([])
  const { message } = App.useApp()

  const addDumpster = async (values: DumpstersInfo) => {
    if (userType === UserType.USER) {
      const { data } = await userAdd({
        variables: {
          props: {
            card_ID: Number(usersCards_ID),
            dumpster_ID: Number(values.dumpster_ID),
            user_ID,
          },
        },
      })

      const status = data?.user?.dumpsters?.add?.status

      if (status?.message === 'Error') {
        await message.warning(status.description ?? 'Wystąpił błąd')
      } else {
        setIsModalOpen(false)
        await message.success('Wysłano wniosek o dodanie altany śmietnikowej')
      }
    } else if (
      userType === UserType.COMPANY ||
      userType === UserType.HOUSING_ASSOCIATION
    ) {
      await companyAdd({
        variables: {
          props: {
            card_ID: Number(usersCards_ID),
            dumpster_ID: Number(values.dumpster_ID),
            user_ID,
          },
        },
      })

      setIsModalOpen(false)
      await refetchUserData()
      await message.success('Dodano dostęp do altany śmietnikowej')
    } else {
      await message.error('Wystąpił błąd')
    }
  }

  // get dumpsters
  const props =
    userType === UserType.COMPANY || userType === UserType.HOUSING_ASSOCIATION
      ? { communities: users_communities, ownerID: user_ID }
      : { communities: users_communities }

  const { data } = useQuery(commonDumpstersQuery, {
    variables: { props },
  })

  useEffect(() => {
    const response = data?.common?.dumpsters?.get

    if (response && dumpstersIDs) {
      const existingDumpsterIds = new Set(dumpstersIDs)

      const filteredDumpsters = response.filter(
        (dumpster) => !existingDumpsterIds.has(dumpster.dumpster_ID)
      )

      const mappedDumpsters = filteredDumpsters.map((dumpster) => ({
        label: dumpster.dumpster_name,
        value: dumpster.dumpster_ID,
      }))

      setDumpstersOptions(mappedDumpsters)
    }
  }, [data, dumpstersIDs])

  // form validation
  const validateDumpsterInfo = (values: Partial<DumpstersInfo>) => {
    const requiredError = validationMessages.required

    const errors: Partial<Record<keyof DumpstersInfo, string>> = {
      dumpster_ID: values.dumpster_ID ? undefined : requiredError,
    }

    return errors
  }

  return (
    <div className={styles.formWrapper}>
      <FormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        popupTitle={`Dodaj śmietnik do karty nr ${cardNumber}`}
        buttonContent="Dodaj altanę"
        buttonType="primary"
        formNode={
          <Form onSubmit={addDumpster} validate={validateDumpsterInfo}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Select
                  name="dumpster_ID"
                  placeholder="Wybierz altanę"
                  selectOptions={dumpstersOptions}
                  defaultValue="Wybierz altanę"
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
