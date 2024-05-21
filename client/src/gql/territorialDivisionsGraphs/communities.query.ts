import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact } from '../graphql'
import { type CommunityInfoType } from '../commonTypes'

export type FindTerritorialCommunitiesVariables = Exact<{
  props: TerritorialCommunitiesGetQueryProps
}>

export interface TerritorialCommunitiesGetQueryProps {
  municipality_ID: number
}

export interface TerritorialDivisionCommunitiesQuery {
  __typename?: 'Query'
  territorialDivision?: {
    __typename?: 'TerritorialDivisionQuery'
    communities?: {
      __typename?: 'TerritorialCommunitiesQuery'
      get?: CommunityInfoType[] | null
    } | null
  } | null
}

export const TerritorialDivisonCommunitiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TerritorialDivisonCommunities' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'props' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'TerritorialCommunitiesGetQueryProps',
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'territorialDivision' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'communities' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'get' },
                        arguments: [
                          {
                            kind: 'Argument',
                            name: { kind: 'Name', value: 'props' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'props' },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'community_ID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'community_name',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'community_description',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'community_municipalityID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'community_voivodeshipID',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TerritorialDivisionCommunitiesQuery,
  FindTerritorialCommunitiesVariables
>
