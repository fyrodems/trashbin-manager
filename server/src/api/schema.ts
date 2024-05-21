/* eslint-disable unicorn/prefer-module */
import { join } from 'node:path'
import { GraphQLError } from 'graphql'
import { fieldAuthorizePlugin, makeSchema } from 'nexus'
import * as types from '../graphql'

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    export: 'Context',
  },
  plugins: [
    fieldAuthorizePlugin({
      formatError() {
        return new GraphQLError('Not authorized', {
          extensions: {
            code: 'FORBIDDEN',
          },
        })
      },
    }),
  ],
})
