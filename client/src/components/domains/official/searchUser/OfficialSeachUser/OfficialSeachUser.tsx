import { Result } from 'antd'
import { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Form } from 'react-final-form'
import { OfficialSearchUserList } from '../OfficialSeachUserList/OfficialSeachUserList'
import {
  type FoundUser,
  type SearchUserInfo,
} from '../officialSearchUserInterfaces'
import styles from './OfficialSearchUser.module.scss'
import { graphql } from '@/gql'
import { Input } from '@/components/domains/common/Input'

const officialFindUserQuery = graphql(`
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

export const OfficialSearchUser: React.FC = () => {
  const [search, { loading, data }] = useLazyQuery(officialFindUserQuery)
  const allUsers = useQuery(officialFindUserQuery, {
    variables: {
      props: {
        users_name: undefined,
      },
    },
  })
  const [usersList, setUsersList] = useState([] as FoundUser[])
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)

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

  const handleSearch = ({ users_name }: SearchUserInfo) => {
    void search({
      variables: {
        props: {
          users_name,
        },
      },
    })
    setFormSubmitted(true)
  }

  useEffect(() => {
    const response = allUsers?.data?.official?.users?.get?.result
    if (response) {
      const newResponse = response.map((u) => {
        const newName = u.users_name.split(' ')
        const firstName = newName.shift()
        return {
          ...u,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          users_name: `${newName.join(' ')} ${firstName}`,
        }
      })
      setUsersList(newResponse)
    }
  }, [allUsers])

  useEffect(() => {
    const response = data?.official?.users?.get?.result
    if (response) {
      const newResponse = response.map((u) => {
        const newName = u.users_name?.split(' ')
        const firstName = newName?.shift()
        return {
          ...u,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          users_name: `${newName?.join(' ')} ${firstName}`,
        }
      })

      setUsersList(newResponse)
    }
  }, [data])

  return (
    <>
      <Form onSubmit={handleSearch}>
        {() => (
          <form
            onChange={debounce((e) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              e.target.value === ''
                ? handleSearch({ users_name: undefined })
                : handleSearch({ users_name: e.target.value as string })
            })}
          >
            <div className={styles.inputWrapper}>
              <Input
                withGradient
                name="users_name"
                placeholder="Wyszukaj..."
                type="text"
              />
            </div>
          </form>
        )}
      </Form>
      <div>
        {formSubmitted && !loading && usersList.length === 0 && (
          <Result
            icon={<></>}
            title="Brak użytkowników spełniających kryteria wyszukiwania"
          />
        )}
        <OfficialSearchUserList loading={loading} usersList={usersList} />
      </div>
    </>
  )
}
