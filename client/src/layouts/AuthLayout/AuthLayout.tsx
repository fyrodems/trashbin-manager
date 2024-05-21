import { useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import { useAuth } from '../../auth/authProvider'

interface AuthLayoutProps {
  access: 'all' | 'loggedIn' | 'loggedOut' | string[]
  fallback?: string
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  access,
  fallback = '/login',
}) => {
  const { loggedIn, loading, user } = useAuth()

  const displayOutlet = useMemo(() => {
    if (access === 'all') {
      return true
    }

    if (access === 'loggedOut' && !loggedIn) {
      return true
    }

    if (access === 'loggedIn' && loggedIn) {
      return true
    }

    if (
      Array.isArray(access) &&
      user &&
      new Set(access).has(user.users_statusID.toString())
    ) {
      return true
    }

    return false
  }, [access, loggedIn, user, loading])

  if (loading)
    return (
      <div style={{ height: '80vh', display: 'grid', placeItems: 'center' }}>
        <Spin size="large" />
      </div>
    )

  return displayOutlet ? <Outlet /> : <Navigate to={fallback} />
}
