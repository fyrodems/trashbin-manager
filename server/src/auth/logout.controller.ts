import type { Request, Response } from 'express'
import { readCookies, clearCookies } from './helpers/cookies'
import { removeRefreshToken } from './helpers/refreshToken'

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = readCookies(req)
  if (refreshToken) {
    await removeRefreshToken(refreshToken)
  }

  clearCookies(res)
  res.json({ status: 'Success' })
}
