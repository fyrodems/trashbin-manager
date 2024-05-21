import { type ExpressContextFunctionArgument } from '@apollo/server/express4'
import { getUserByAccessToken } from '../auth/helpers/accessToken'
import { readCookies } from '../auth/helpers/cookies'
import prisma from '../db'

export const context = async ({ req, res }: ExpressContextFunctionArgument) => {
  const { accessToken } = readCookies(req)

  if (!accessToken) {
    return { res, prisma }
  }

  const user = await getUserByAccessToken(accessToken)

  return { user, res, prisma }
}

export type Context = Awaited<ReturnType<typeof context>>
