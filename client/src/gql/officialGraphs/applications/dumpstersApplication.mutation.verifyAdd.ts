import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars } from '../../graphql'
import { type StatusType } from '@/gql/commonTypes'

export interface OfficialAddDumpstersApplicationsVerifyMutationProps {
  isVerified: Scalars['Boolean']
  dumpstersApplications_ID: Scalars['Int']
  reviewer: Scalars['Int']
  card_ID: Scalars['Int']
  dumpster_ID: Scalars['Int']
}

export type OfficialDumpstersApplicationsVerifyAddMutationVariables = Exact<{
  props: OfficialAddDumpstersApplicationsVerifyMutationProps
}>

export interface OfficialDumpstersApplicationsVerifyAddMutation {
  __typename?: 'Mutation'
  official?: {
    __typename?: 'OfficialMutation'
    applications?: {
      __typename?: 'OfficialApplicationsMutation'
      dumpsters?: {
        __typename?: 'OfficialDumpstersApplicationsMutation'
        verifyAdd?: {
          __typename?: 'MutationResponseType'
          status: StatusType
        } | null
      } | null
    } | null
  } | null
}

export const OfficialDumpstersApplicationsVerifyAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'OfficialDumpstersApplicationsVerifyAdd' },
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
                value: 'OfficialAddDumpstersApplicationsVerifyMutationProps',
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
            name: { kind: 'Name', value: 'official' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'applications' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dumpsters' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'verifyAdd' },
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
                                    name: { kind: 'Name', value: 'status' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'message',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'description',
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
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  OfficialDumpstersApplicationsVerifyAddMutation,
  OfficialDumpstersApplicationsVerifyAddMutationVariables
>
