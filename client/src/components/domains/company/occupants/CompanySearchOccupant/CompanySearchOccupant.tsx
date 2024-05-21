import { Button, Result } from 'antd'
import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Form } from 'react-final-form'
import { SearchOutlined } from '@ant-design/icons'
import { CompanySearchUserList } from '../CompanySearchUserList/CompanySearchUserList'
import styles from './CompanySearchOccupant.module.scss'
import {
  type CompanySearchOccupantProps,
  type FoundUser,
  type SearchUserInfo,
} from './interfaces'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'

const companyFindUserQuery = graphql(`
  query OfficialUserGets($props: OfficialUserInfoGetQueryProps!) {
    official {
      users {
        get {
          result(props: $props) {
            users_ID
            users_login
            users_name
            users_identificationNumber
            users_phoneNumber
            users_statusID
          }
        }
      }
    }
  }
`)

export const CompanySearchOccupant: React.FC<CompanySearchOccupantProps> = ({
  occupants,
  occupantsToAdd,
  setOccupantsToAdd,
  refetch,
}) => {
  const [search, { loading, data }] = useLazyQuery(companyFindUserQuery)
  const [usersList, setUsersList] = useState([] as FoundUser[])
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)

  const handleSearch = ({ users_name }: SearchUserInfo) => {
    if (users_name) {
      void search({
        variables: {
          props: {
            users_name,
            /*             users_identificationNumber: undefined,
            users_login: undefined,
            users_phoneNumber: undefined, */
          },
        },
      })
      setFormSubmitted(true)
    }
  }

  useEffect(() => {
    const response = data?.official?.users?.get?.result
    if (response) {
      const newResponse = response.map((u) => {
        const newName = u.users_name.split(' ')
        const firstName = newName.shift()
        return {
          ...u,
          users_name: `${newName.join(' ')} ${firstName ?? ''}`,
        }
      })
      setUsersList(newResponse)
    }
  }, [data])

  /**
   *  funkcja do usuwania rekordów z listy wyszukanych użytkowników
   *  po dodaniu go do spółdzielni
   *
   *  @param {Array} array1 - Lista wszystkich lokatorów w spółdzielni
   *  @param {Array} array2 - Lista wyszukanych użytkowników, z której usuwane są rekordy
   *
   */

  const mergeUniqueUsers = (
    array1: FoundUser[],
    array2: FoundUser[]
  ): FoundUser[] => {
    /*  const mergedArray = array1.concat(array2)

    const countMap: Record<number, number> = {}


   for (const user of mergedArray) {
      const userId = user.users_ID
      countMap[userId] = (countMap[userId] || 0) + 1
    }

    const resultArray = mergedArray.filter(
      (user) => countMap[user.users_ID] === 1
    )
 */
    const array1IDs = array1.map((user) => user.users_ID)
    const resultArray = array2.filter(
      (user) => !array1IDs.includes(user.users_ID)
    )

    return resultArray
  }

  return (
    <>
      <Form onSubmit={handleSearch}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <Input
                withGradient
                name="users_name"
                placeholder={
                  <span className={styles.search}>
                    <SearchOutlined />
                    Imię lub nazwisko
                  </span>
                }
                type="text"
              />
              <div className={styles.searchUserButton}>
                <Button htmlType="submit" type="primary">
                  Wyszukaj
                </Button>
              </div>
            </div>
          </form>
        )}
      </Form>
      <div>
        {formSubmitted && !loading && usersList.length === 0 ? (
          <Result
            icon={<></>}
            title="Brak użytkowników spełniających kryteria wyszukiwania"
          />
        ) : (
          <CompanySearchUserList
            findUserLoading={loading}
            usersList={
              formSubmitted ? mergeUniqueUsers(occupants, usersList) : usersList
            }
            occupantsToAdd={occupantsToAdd}
            setOccupantsToAdd={setOccupantsToAdd}
            refetch={refetch}
          />
        )}
      </div>
    </>
  )
}
