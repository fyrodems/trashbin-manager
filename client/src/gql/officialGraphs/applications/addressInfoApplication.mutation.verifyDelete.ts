import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars } from '../../graphql'
import { type StatusType } from '@/gql/commonTypes'

export interface OfficialDeleteAddressInfoApplicationsVerifyMutationProps {
  isVerified: Scalars['Boolean']
  reviewer: Scalars['Int']
  addressApplications_ID: Scalars['Int']
  userAddress_ID: Scalars['Int']
}

export type OfficialAddressInfoApplicationsVerifyDeleteMutationVariables =
  Exact<{
    props: OfficialDeleteAddressInfoApplicationsVerifyMutationProps
  }>

export interface OfficialAddressInfoApplicationsVerifyDeleteMutation {
  __typename?: 'Mutation'
  official?: {
    __typename?: 'OfficialMutation'
    applications?: {
      __typename?: 'OfficialApplicationsMutation'
      addressInfo?: {
        __typename?: 'OfficialAddressInfoApplicationsMutation'
        verifyDelete?: {
          __typename?: 'MutationResponseType'
          status: StatusType
        } | null
      } | null
    } | null
  } | null
}

export const OfficialAddressInfoApplicationsVerifyDeleteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: {
        kind: 'Name',
        value: 'OfficialAddressInfoApplicationsVerifyDelete',
      },
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
                value:
                  'OfficialDeleteAddressInfoApplicationsVerifyMutationProps',
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
                              name: { kind: 'Name', value: 'verifyDelete' },
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
  OfficialAddressInfoApplicationsVerifyDeleteMutation,
  OfficialAddressInfoApplicationsVerifyDeleteMutationVariables
>
