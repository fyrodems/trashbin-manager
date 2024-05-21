/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Form } from 'react-final-form'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { App, Button } from 'antd'
import styles from './CompanyGarbageSearchForm.module.scss'
import { graphql } from '@/gql'
import { useAuth } from '@/auth/authProvider'
import { FormModal } from '@/components/domains/common/FormModal'
import { DateInput } from '@/components/domains/common/Inputs/DateInput'

const companyGarbageQuery = graphql(`
  query CompanyGarbageGet($props: CompanyGarbageGetQueryProps!) {
    company {
      garbage {
        get(props: $props) {
          dumpsterID
          garbage {
            paper
            glass
            bio
            plastic
            mixed
          }
        }
      }
    }
  }
`)

export const CompanyGarbageSearchForm = ({ setPeriodGarbage }) => {
  const { user } = useAuth()
  const { message } = App.useApp()
  const [search, { data }] = useLazyQuery(companyGarbageQuery)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleSearch = async (values) => {
    !values.dateFrom || !values.dateTo
      ? await message.error('Błędne dane - uzupłenij poprawnie pola')
      : null

    const { data } = await search({
      variables: {
        props: {
          company_ID: user?.basicInfo?.users_ID ?? 0,
          garbage_dateFrom: new Date(values.dateFrom).toISOString(),
          garbage_dateTo: new Date(values.dateTo).toISOString(),
        },
      },
    })

    const dataAvailable = data?.company?.garbage?.get
    dataAvailable ? setIsModalOpen(false) : await message.error('Wystąpił błąd')
  }

  useEffect(() => {
    const response = data?.company?.garbage?.get
    setPeriodGarbage(response)
  }, [data])

  const formNode = (
    <Form onSubmit={handleSearch}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.inputsWrapper}>
            <div>
              <div className={styles.dateInputLabel}>Od</div>
              <DateInput name={'dateFrom'} placeholder={'Od'} />
            </div>
            <div>
              <div className={styles.dateInputLabel}>Do</div>
              <DateInput name={'dateTo'} placeholder={'Do'} />
            </div>
          </div>
          <div className={styles.actionWraper}>
            <Button
              onClick={() => {
                setIsModalOpen(false)
              }}
            >
              Anuluj
            </Button>
            <Button htmlType="submit" type="primary">
              Dodaj
            </Button>
          </div>
        </form>
      )}
    </Form>
  )

  return (
    <>
      <FormModal
        popupTitle={'Wybierz zakres do przedstawienia na wykresie'}
        formNode={formNode}
        buttonContent="Wybierz zakres"
        buttonType="primary"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}
