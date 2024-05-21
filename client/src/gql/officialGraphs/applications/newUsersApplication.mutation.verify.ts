import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact, type Scalars } from '../../graphql'
import { type StatusType } from '@/gql/commonTypes'

export interface OfficialNewUserApplicationVerifyMutationProps {
  isVerified: Scalars['Boolean']
  userID: Scalars['Int']
}

export type OfficialNewUserApplicationVerifyMutationVariables = Exact<{
  props: OfficialNewUserApplicationVerifyMutationProps
}>

export interface OfficialNewUserApplicationVerifyMutation {
  __typename?: 'Mutation'
  official?: {
    __typename?: 'OfficialMutation'
    applications?: {
      __typename?: 'OfficialApplicationsMutation'
      newUser?: {
        __typename?: 'OfficialNewUserApplicationMutation'
        verify?: {
          __typename?: 'MutationResponseType'
          status: StatusType
        } | null
      } | null
    } | null
  } | null
}

export const OfficialNewUserApplicationVerifyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'OfficialNewUserApplicationVerify' },
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
                value: 'OfficialNewUserApplicationVerifyMutationProps',
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
                        name: { kind: 'Name', value: 'newUser' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'verify' },
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
  OfficialNewUserApplicationVerifyMutation,
  OfficialNewUserApplicationVerifyMutationVariables
>
