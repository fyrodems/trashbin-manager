import { type Session, type Users } from '@prisma/client'
import { sign, verify } from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import { env } from '../../../env'
import prisma from '../../db'

const signRefreshToken = (session: Session) => {
  const { id, userId } = session

  const refreshToken = sign({ id, userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  })

  return refreshToken
}

export const decodeRefreshToken = (refreshToken: string) => {
  try {
    const decoded = verify(refreshToken, env.REFRESH_TOKEN_SECRET)

    if (typeof decoded === 'string') {
      throw new TypeError('Wrong refresh token payload')
    }

    const { id, userId } = decoded

    if (typeof id !== 'string' || typeof userId !== 'number') {
      throw new TypeError('Wrong refresh token payload')
    }

    return { id, userId }
  } catch {
    return null
  }
}

export const createRefreshToken = async (user: Users) => {
  try {
    const session = await prisma.session.create({
      data: {
        id: uuid(),
        userId: user.users_ID,
      },
    })

    return signRefreshToken(session)
  } catch {
    return null
  }
}

export const removeRefreshToken = async (refreshToken: string) => {
  const payload = decodeRefreshToken(refreshToken)

  if (payload === null) {
    throw new Error('Wrong token')
  }

  try {
    await prisma.session.delete({
      where: {
        id: payload.id,
      },
    })
  } catch {}
}

export const renewRefreshToken = async (refreshToken: string) => {
  const payload = decodeRefreshToken(refreshToken)

  if (payload === null) {
    return null
  }

  try {
    const session = await prisma.session.update({
      where: {
        id: payload.id,
      },
      data: {
        id: uuid(),
      },
      include: {
        user: true,
      },
    })

    if (!session.user) {
      return null
    }

    return { refreshToken: signRefreshToken(session), user: session.user }
  } catch {
    return null
  }
}
