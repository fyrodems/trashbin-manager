import { type Users } from '@prisma/client'
import { sign, verify } from 'jsonwebtoken'
import { env } from '../../../env'
import prisma from '../../db'

const decodeAccessToken = (accessToken: string) => {
  try {
    const decoded = verify(accessToken, env.ACCESS_TOKEN_SECRET)

    if (typeof decoded === 'string') {
      throw new TypeError('Wrong refresh token payload')
    }

    const { users_login, users_password } = decoded

    if (typeof users_login !== 'string' || typeof users_password !== 'string') {
      throw new TypeError('Wrong refresh token payload')
    }

    return { users_login, users_password }
  } catch {
    return null
  }
}

export const createAccessToken = ({ users_login, users_password }: Users) => {
  const accessToken = sign(
    { users_login, users_password },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    }
  )

  return accessToken
}

export const getUserByAccessToken = async (accessToken: string) => {
  const payload = decodeAccessToken(accessToken)

  if (payload === null) {
    return null
  }

  // console.log(payload?.exp)
  try {
    const user = await prisma.users.findUniqueOrThrow({
      where: {
        users_login: payload.users_login,
      },
      /*     include: {
        verificationsReceived: true,
      }, */
    })

    return user
  } catch {
    return null
  }
}
