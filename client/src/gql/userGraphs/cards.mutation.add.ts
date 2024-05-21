import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type InputMaybe, type Exact, type Scalars } from '../graphql'
import { type StatusType } from '../commonTypes'

export interface UserCardsAddMutationProps {
  usersCards_userID: Scalars['Int']
  usersCards_numberPIN?: InputMaybe<Scalars['String']>
  dumpstersIDs: InputMaybe<Array<Scalars['Int']>>
}

export type UserCardsAddMutationVariables = Exact<{
  props: UserCardsAddMutationProps
}>

export interface UserCardsAddMutation {
  __typename?: 'Mutation'
  user?: {
    __typename?: 'UserMutation'
    cards?: {
      __typename?: 'UserCardsMutation'
      add?: {
        __typename?: 'MutationResponseType'
        status: StatusType
      } | null
    } | null
  } | null
}

export const UserCardsAddDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UserCardsAdd' },
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
              name: { kind: 'Name', value: 'UserCardsAddMutationProps' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cards' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'add' },
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
                                    name: { kind: 'Name', value: 'message' },
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
  UserCardsAddMutation,
  UserCardsAddMutationVariables
>
