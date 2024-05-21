import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { OfficialDumpstersApplicationsArchives } from '../../archivedApplications/OfficialDumpstersApplicationsArchives/OfficialDumpstersApplicationsArchives'
import { OfficialCardsApplicationsArchives } from '../../archivedApplications/OfficialCardsApplicationsArchives/OfficialCardsApplicationsArchives'
import { OfficialAddressesApplicationsArchives } from '../../archivedApplications/OfficialAddressesApplicationsArchives/OfficialAddressesApplicationsArchives'
import { OfficialPersonalDataApplicationsArchives } from '../../archivedApplications/OfficialPersonalDataApplicationsArchives/OfficialPersonalDataApplicationsArchives'
import { type ApplicationArchiveType } from './interfaces'
import { graphql } from '@/gql'

const officialApplicationCardsQuery = graphql(`
  query OfficialApplicationsArchiveGet {
    official {
      applications {
        archive {
          get {
            addressApplications {
              addressApplications_ID
              addressApplications_typeID
              addressApplications_addressTypeID
              addressApplications_userName
              addressApplications_statusID
              addressApplications_dateAdded
              addressApplications_userLogin
              addressApplications_userIdentificationNumber
              addressApplications_street
              addressApplications_houseNumber
              addressApplications_apartamentNumber
              addressApplications_postCode
              addressApplications_city
              addressApplications_dateReviewed
            }
            dumpstersApplications {
              dumpstersApplications_ID
              dumpstersApplications_typeID
              dumpstersApplications_userName
              dumpstersApplications_statusID
              dumpstersApplications_dateAdded
              dumpstersApplications_userLogin
              dumpstersApplications_userIdentificationNumber
              dumpstersApplications_cardNumber
              dumpstersApplications_dumpsterNumber
              dumpstersApplications_dateReviewed
            }
            cardsApplications {
              cardsApplications_ID
              cardsApplications_typeID
              cardsApplications_userName
              cardsApplications_statusID
              cardsApplications_dateAdded
              cardsApplications_userName
              cardsApplications_userLogin
              cardsApplications_userIdentificationNumber
              cardsApplications_dateReviewed
            }
            personalDataApplications {
              personalDataApplications_ID
              personalDataApplications_userName
              personalDataApplications_statusID
              personalDataApplications_dateAdded
              personalDataApplications_userLogin
              personalDataApplications_userIdentificationNumber
              personalDataApplications_name
              personalDataApplications_dateReviewed
            }
          }
        }
      }
    }
  }
`)

export const OfficialArchivedApplicationsView: React.FC = () => {
  const { data } = useQuery(officialApplicationCardsQuery)
  const [applicationsList, setApplicationsList] =
    useState<ApplicationArchiveType>()

  useEffect(() => {
    const response = data?.official?.applications?.archive?.get
    if (response) {
      setApplicationsList(response)
    }
  }, [data])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <OfficialDumpstersApplicationsArchives
        applicationList={applicationsList?.dumpstersApplications}
      />
      <OfficialCardsApplicationsArchives
        applicationList={applicationsList?.cardsApplications}
      />
      <OfficialAddressesApplicationsArchives
        applicationList={applicationsList?.addressApplications}
      />
      <OfficialPersonalDataApplicationsArchives
        applicationList={applicationsList?.personalDataApplications}
      />
    </div>
  )
}
