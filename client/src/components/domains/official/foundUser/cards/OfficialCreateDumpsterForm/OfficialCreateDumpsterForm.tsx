import { App, Button } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import {
  type OfficialCreateDumpsterFormProps,
  type DumpstersInfo,
} from '../cardsInterfaces'
import styles from '../OfficialCards.module.scss'
import { graphql } from '@/gql'
import { validationMessages } from '@/utils/validationMessages'
import { FormModal } from '@/components/domains/common/FormModal'
import { Select } from '@/components/domains/common/Select'
import { findCommonCommunities } from '@/utils/findCommonCommunities'

const officialDumpstersAddMutation = graphql(`
  mutation OfficialDumpstersAdd($props: OfficialDumpstersAddMutationProps!) {
    official {
      dumpsters {
        add(props: $props) {
          status {
            message
          }
        }
      }
    }
  }
`)

const commonDumpstersQuery = graphql(`
  query CommonDumpstersGet1($props: CommonDumpstersGetQueryProps!) {
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

export const OfficialCreateDumpsterForm: React.FC<
  OfficialCreateDumpsterFormProps
> = ({ cardData, refetch, userCommunityIDs, officialCommunityIDs }) => {
  const [add, { loading }] = useMutation(officialDumpstersAddMutation)
  const { message } = App.useApp()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [dumpstersOptions, setDumpstersOptions] = useState<any[]>([])

  const addDumpster = async (values: DumpstersInfo) => {
    const { data } = await add({
      variables: {
        props: {
          card_ID: Number(cardData.usersCards_ID),
          dumpster_ID: Number(values.dumpster_ID),
        },
      },
    })

    const status = data?.official?.dumpsters?.add?.status.message

    if (status === 'Error') {
      await message.error('Wystąpił błąd')
    } else {
      await message.success('Dodano dostęp do altany')
      setIsModalOpen(false)
    }

    await refetch()
  }

  // get dumpsters
  const props = {
    communities: findCommonCommunities(userCommunityIDs, officialCommunityIDs),
  }

  const { data } = useQuery(commonDumpstersQuery, {
    variables: { props },
  })
  useEffect(() => {
    const response = data?.common?.dumpsters?.get
    if (response) {
      const mappedDumpsters = response.map((dumpster) => ({
        label: dumpster.dumpster_name,
        value: dumpster.dumpster_ID,
      }))
      setDumpstersOptions(mappedDumpsters)
    }
  }, [data])

  const validateDumpsterInfo = (values: Partial<DumpstersInfo>) => {
    const requiredError = validationMessages.required

    const errors: Partial<Record<keyof DumpstersInfo, string>> = {
      dumpster_ID: values.dumpster_ID ? undefined : requiredError,
    }

    return errors
  }

  return (
    <>
      <FormModal
        popupTitle={'Dodaj dostęp do altany śmietnikowej'}
        buttonContent={'Dodaj dostęp do altany'}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formNode={
          <Form onSubmit={addDumpster} validate={validateDumpsterInfo}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Select
                  name="dumpster_ID"
                  placeholder="Wybierz altanę"
                  selectOptions={dumpstersOptions}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button htmlType="submit" type="primary" loading={loading}>
                    Dodaj altanę do karty
                  </Button>
                </div>
              </form>
            )}
          </Form>
        }
      />
    </>
  )
}
