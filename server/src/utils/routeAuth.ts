import type { FieldAuthorizeResolver } from 'nexus/dist/plugins/fieldAuthorizePlugin'

type LoggedInAuth = () => FieldAuthorizeResolver<any, any>

type HasRoleAuth = (roles: string[]) => FieldAuthorizeResolver<any, any>

type VerifiedAuth = (isVerified: boolean) => FieldAuthorizeResolver<any, any>

export const loggedIn: LoggedInAuth =
  () =>
  (_parent, _args, { user }) => {
    return Boolean(user)
  }

export const hasRole: HasRoleAuth =
  (/* roles */) =>
  (_parent, _args, { user }) => {
    /*     const rolesSet = new Set(roles) */
    if (!user) {
      return false
    }

    /*     if (!rolesSet.has(user.role)) {
      return false
    } */

    return true
  }

export const verified: VerifiedAuth =
  (isVerified) =>
  (_parent, _args, { user }) => {
    return Boolean(user?./* verificationsReceived */ users_ID) === isVerified
  }
