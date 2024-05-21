/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Card, Divider, Statistic } from 'antd'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { type CompanyGarbageProps } from '../interfaces'
import styles from './CompanyReportSmall.module.scss'
import { graphql } from '@/gql'
import { type OfficialUserOccupantSearchType } from '@/gql/commonTypes'
import { useAuth } from '@/auth/authProvider'
import { UserType } from '@/types/UserType'

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

export const CompanyReportSmall: React.FC<CompanyGarbageProps> = ({
  allGarbage,
}) => {
  const { data } = useQuery(findOccupantsQuery)
  const [occupants, setOccupants] = useState<OfficialUserOccupantSearchType[]>(
    []
  )
  const { user } = useAuth()
  const userName = user?.basicInfo?.users_name
  const companyCards = user?.cards
  const companyDumpsters = user?.dumpsters
  const companyAddresses = user?.addressInfo

  useEffect(() => {
    if (data?.company?.occupants?.get) {
      setOccupants(data?.company?.occupants?.get)
    }
  }, [data])

  const allGarbageEverThrownAway = (dumpsterData) => {
    let szklo = 0
    let bio = 0
    let mieszane = 0
    let papier = 0
    let plastik = 0
    let sum = 0

    for (const dumpster of dumpsterData) {
      if (dumpster.garbage && typeof dumpster.garbage === 'object') {
        szklo += dumpster.garbage.glass || 0
        bio += dumpster.garbage.bio || 0
        mieszane += dumpster.garbage.mixed || 0
        papier += dumpster.garbage.paper || 0
        plastik += dumpster.garbage.plastic || 0
      }
    }

    const allGarbageTypes = {
      glass: szklo,
      bio: bio,
      mixed: mieszane,
      paper: papier,
      plastic: plastik,
    }

    for (const category in allGarbageTypes) {
      if (allGarbageTypes.hasOwnProperty(category)) {
        sum += allGarbageTypes[category]
      }
    }

    return (sum / 1_000_000).toFixed(2) // suma w tonach
  }

  return (
    <div
      style={{
        margin: '50px 0',
      }}
    >
      <Divider>{`${userName} w liczbach`}</Divider>
      <div className={styles.cardWrapper}>
        <Card className={styles.card}>
          {user?.userType === UserType.COMPANY ? (
            <Statistic
              title="Oddziały firmy"
              value={companyAddresses?.length}
              groupSeparator={' '}
            />
          ) : (
            <Statistic
              title="Użytkownicy w spółdzielni"
              value={occupants.length}
              groupSeparator={' '}
            />
          )}
        </Card>
        <Card className={styles.card}>
          <Statistic
            title="Posiadane karty dostępu"
            value={companyCards?.length}
            groupSeparator={' '}
          />
        </Card>
        <Card className={styles.card}>
          <Statistic
            title="Posiadane altany śmietnikowe"
            value={companyDumpsters?.length}
            groupSeparator={' '}
          />
        </Card>
        <Card className={styles.card}>
          <Statistic
            title="Całkowita suma wyrzuconych śmieci"
            value={allGarbage && allGarbageEverThrownAway(allGarbage)}
            groupSeparator={' '}
            suffix="t"
            loading={!allGarbage}
          />
        </Card>
      </div>
    </div>
  )
}
