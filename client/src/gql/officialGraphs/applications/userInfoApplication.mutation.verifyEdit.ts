import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars } from '../../graphql'
import { type StatusType } from '@/gql/commonTypes'

export interface OfficialEditUserInfoApplicationsVerifyMutationProps {
  isVerified: Scalars['Boolean']
  reviewer: Scalars['Int']
  personalDataApplications_ID: Scalars['Int']
  user_ID: Scalars['Int']
}

export type OfficialUserInfoApplicationsVerifyEditMutationVariables = Exact<{
  props: OfficialEditUserInfoApplicationsVerifyMutationProps
}>

export interface OfficialUserInfoApplicationsVerifyEditMutation {
  __typename?: 'Mutation'
  official?: {
    __typename?: 'OfficialMutation'
    applications?: {
      __typename?: 'OfficialApplicationsMutation'
      userInfo?: {
        __typename?: 'OfficialUserInfoApplicationsMutation'
        verifyEdit?: {
          __typename?: 'MutationResponseType'
          status: StatusType
        } | null
      } | null
    } | null
  } | null
}

export const OfficialUserInfoApplicationsVerifyEditDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: {
        kind: 'Name',
        value: 'OfficialUserInfoApplicationsVerifyEdit',
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
                value: 'OfficialEditUserInfoApplicationsVerifyMutationProps',
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
                        name: { kind: 'Name', value: 'userInfo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'verifyEdit' },
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
  OfficialUserInfoApplicationsVerifyEditMutation,
  OfficialUserInfoApplicationsVerifyEditMutationVariables
>
