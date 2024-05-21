import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { graphql } from '@/gql'
import { voivodeships } from '@/utils/voivodeshipsData'

const findMunicipalitiesQuery = graphql(`
  query TerritorialDivisonMunicipalities(
    $props: TerritorialMunicipalitiesGetQueryProps!
  ) {
    territorialDivision {
      municipalities {
        get(props: $props) {
          municipality_ID
          municipality_name
          municipality_description
          municipality_voivodeshipID
        }
      }
    }
  }
`)

const findCommunitiesQuery = graphql(`
  query TerritorialDivisonCommunities(
    $props: TerritorialCommunitiesGetQueryProps!
  ) {
    territorialDivision {
      communities {
        get(props: $props) {
          community_ID
          community_name
          community_description
          community_municipalityID
          community_voivodeshipID
        }
      }
    }
  }
`)

export interface SelectOptionsProps {
  value: string
  label: string
}

export interface FindMunicipalitiesProps {
  voivodeship_ID: number
}

export interface FindCommunitiesProps {
  municipality_ID: number
}

function useTerritorialDivision(
  initialVoivodeshipID = 0,
  initialMunicipalityID = 0,
  initialCommunityID: number | undefined = undefined
) {
  const [voivodeshipID, setVoivodeshipID] =
    useState<number>(initialVoivodeshipID)
  const [municipalities, setMunicipalities] = useState<SelectOptionsProps[]>([])
  const [municipalityID, setMunicipalityID] = useState<number>(
    initialMunicipalityID
  )
  const [communities, setCommunities] = useState<SelectOptionsProps[]>([])
  const [communityID, setCommunityID] = useState<number | undefined>(
    initialCommunityID
  )

  useEffect(() => {
    if (initialCommunityID) {
      for (const voivodeship of voivodeships) {
        if (initialCommunityID <= voivodeship.communities) {
          setVoivodeshipID(Number(voivodeship.value))
          break
        }
      }
    }
  })

  const [searchMunicipalities] = useLazyQuery(findMunicipalitiesQuery)

  const [searchCommunities] = useLazyQuery(findCommunitiesQuery)
  const findMunicipalities = async (values: FindMunicipalitiesProps) => {
    const { data } = await searchMunicipalities({
      variables: {
        props: {
          voivodeship_ID: values.voivodeship_ID,
        },
      },
    })
    return data?.territorialDivision?.municipalities?.get
  }

  const findCommunities = async (values: FindCommunitiesProps) => {
    const { data } = await searchCommunities({
      variables: {
        props: {
          municipality_ID: values.municipality_ID,
        },
      },
    })
    return data?.territorialDivision?.communities?.get
  }

  useEffect(() => {
    const temporaryArrayForMunicipalities: SelectOptionsProps[] = []
    findMunicipalities({
      voivodeship_ID: voivodeshipID,
    }).then((data) => {
      data?.forEach((elem: any) => {
        temporaryArrayForMunicipalities.push({
          value: elem.municipality_ID,
          label: elem.municipality_name,
        })
      })
    })
    setMunicipalities(temporaryArrayForMunicipalities)
    setMunicipalityID(0)
    setCommunityID(undefined)
  }, [voivodeshipID])

  useEffect(() => {
    const temporaryArrayForCommunity: SelectOptionsProps[] = []
    findCommunities({
      municipality_ID: municipalityID,
    }).then((data) => {
      data?.forEach((elem: any) => {
        temporaryArrayForCommunity.push({
          value: elem.community_ID,
          label: elem.community_name,
        })
      })
    })
    setCommunities(temporaryArrayForCommunity)
    setCommunityID(undefined)
  }, [municipalityID])
  const voivodeshipsData = { voivodeshipID, setVoivodeshipID }
  const municipalitiesData = {
    municipalities,
    municipalityID,
    setMunicipalityID,
  }
  const communitiesData = {
    communities,
    communityID,
    setCommunityID,
  }
  return { voivodeshipsData, municipalitiesData, communitiesData }
}

export default useTerritorialDivision
