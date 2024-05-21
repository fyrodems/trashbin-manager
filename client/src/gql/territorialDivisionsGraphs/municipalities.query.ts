import { type TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { type Exact } from '../graphql'
import { type MunicipalityInfoType } from '../commonTypes'

export type FindTerritorialMunicipalitiesVariables = Exact<{
  props: TerritorialMunicipalitiesGetQueryProps
}>

export interface TerritorialMunicipalitiesGetQueryProps {
  voivodeship_ID: number
}

export interface TerritorialDivisionMunicipalitiesQuery {
  __typename?: 'Query'
  territorialDivision?: {
    __typename?: 'TerritorialDivisionQuery'
    municipalities?: {
      __typename?: 'TerritorialMunicipalitiesQuery'
      get?: MunicipalityInfoType[] | null
    } | null
  } | null
}

export const TerritorialDivisonMunicipalitiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'TerritorialDivisonMunicipalities' },
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
                value: 'TerritorialMunicipalitiesGetQueryProps',
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
                  name: { kind: 'Name', value: 'municipalities' },
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
                                value: 'municipality_ID',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'municipality_name',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'municipality_description',
                              },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'municipality_voivodeshipID',
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
  TerritorialDivisionMunicipalitiesQuery,
  FindTerritorialMunicipalitiesVariables
>
