import { type CookieOptions, type Response, type Request } from 'express'

interface Cookies {
  access_token?: string
  refresh_token?: string
}

const msDay =
  1000 /* in second */ * 60 /* in minute */ * 60 /* in hour */ * 24 /* in day */

const options: CookieOptions = {
  secure: false,
  /* sameSite: 'strict',  */
  httpOnly: true,
  path: '/',
}

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  res.cookie('refresh_token', refreshToken, {
    maxAge: 30 * msDay,
    ...options,
  })

  res.cookie('access_token', accessToken, {
    maxAge: msDay,
    ...options,
  })
}

export const clearCookies = (res: Response) => {
  res.clearCookie('refresh_token', {
    ...options,
  })

  res.clearCookie('access_token', {
    maxAge: msDay,
    ...options,
  })
}

export const readCookies = (req: Request) => {
  let accessToken: string | null = null
  let refreshToken: string | null = null

  const cookies = req.cookies as Cookies

  if (cookies) {
    accessToken = cookies.access_token ?? null
    refreshToken = cookies.refresh_token ?? null
  }

  return { accessToken, refreshToken }
}
