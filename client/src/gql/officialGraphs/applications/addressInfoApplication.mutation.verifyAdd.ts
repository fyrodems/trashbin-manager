import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars } from '../../graphql'
import { type StatusType } from '@/gql/commonTypes'

export interface OfficialAddAddressInfoApplicationsVerifyMutationProps {
  isVerified: Scalars['Boolean']
  reviewer: Scalars['Int']
  addressApplications_ID: Scalars['Int']
  user_ID: Scalars['Int']
}

export type OfficialAddressInfoApplicationsVerifyAddMutationVariables = Exact<{
  props: OfficialAddAddressInfoApplicationsVerifyMutationProps
}>

export interface OfficialAddressInfoApplicationsVerifyAddMutation {
  __typename?: 'Mutation'
  official?: {
    __typename?: 'OfficialMutation'
    applications?: {
      __typename?: 'OfficialApplicationsMutation'
      addressInfo?: {
        __typename?: 'OfficialAddressInfoApplicationsMutation'
        verifyAdd?: {
          __typename?: 'MutationResponseType'
          status: StatusType
        } | null
      } | null
    } | null
  } | null
}

export const OfficialAddressInfoApplicationsVerifyAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'OfficialAddressInfoApplicationsVerifyAdd' },
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
                value: 'OfficialAddAddressInfoApplicationsVerifyMutationProps',
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
                        name: { kind: 'Name', value: 'addressInfo' },
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
  OfficialAddressInfoApplicationsVerifyAddMutation,
  OfficialAddressInfoApplicationsVerifyAddMutationVariables
>
