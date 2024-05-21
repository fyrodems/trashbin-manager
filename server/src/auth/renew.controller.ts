import type { Request, Response } from 'express'
import { createAccessToken } from './helpers/accessToken'
import { clearCookies, readCookies, setCookies } from './helpers/cookies'
import { renewRefreshToken } from './helpers/refreshToken'

export const renew = async (req: Request, res: Response) => {
  const { refreshToken } = readCookies(req)

  if (!refreshToken) {
    return res.status(400).json({ error: 'No refresh token' })
  }

  const refresh = await renewRefreshToken(refreshToken)

  if (!refresh) {
    clearCookies(res)
    return res.status(400).json({ error: 'Wrong refresh token' })
  }

  const { user, refreshToken: newRefreshToken } = refresh

  const accessToken = createAccessToken(user)

  setCookies(res, accessToken, newRefreshToken)
  return res.json({ status: 'Success' })
}
