import process from 'node:process'
import 'dotenv/config'
import { cleanEnv, makeValidator } from 'envalid'

const str = makeValidator((input) => {
  if (/.+/.test(input)) {
    return input
  }

  throw new Error('Empty var')
})

export const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  ACCESS_TOKEN_SECRET: str(),
  ACCESS_TOKEN_EXPIRES_IN: str(),
  REFRESH_TOKEN_SECRET: str(),
  REFRESH_TOKEN_EXPIRES_IN: str(),
})
