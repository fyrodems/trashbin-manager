/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import { ConfigProvider, App } from 'antd'
import { MehOutlined } from '@ant-design/icons'
import styles from './AppLayout.module.scss'
import { AuthenticatedAppMenu } from '@/components/domains/common/AuthenticatedAppMenu'
import logo from '@/assets/BAL-logo.svg'
import { useAuth } from '@/auth/authProvider'
import { SessionTimer } from '@/components/domains/common/SessionTimer/SessionTimer'

const routesWithoutAccount = new Set(['/login'])

const UnauthenticatedAppMenu: React.FC = () => {
  return (
    <nav
      className={styles.menu}
      data-type="unauthenticated"
      data-relation="app-layout"
    >
      <ul>
        <li className={styles.menuElement}>
          <a aria-current="page" href="/" draggable={false}>
            Strona główna
          </a>
        </li>
      </ul>
    </nav>
  )
}

const generatePageName = (link: string, id: string) => {
  switch (link) {
    /* user */
    case '/home': {
      return 'Strona główna'
    }

    case '/profile': {
      return 'Mój profil'
    }

    case '/statistics': {
      return 'Statystyki'
    }

    case '/cards': {
      return 'Karty dostępu'
    }

    case '/applications': {
      return 'Przegląd wniosków'
    }

    /* official */
    case '/users': {
      return 'Znajdź użytkownika'
    }

    case '/create-user': {
      return 'Tworzenie konta'
    }

    case '/dumpster': {
      return 'Altany śmietnikowe'
    }

    case '/archived-applications': {
      return 'Archiwalne wnioski'
    }

    case `/user/${id}`: {
      return 'Edycja profilu'
    }

    /* super official */
    case '/officials': {
      return 'Lista urzędników'
    }

    /* company aka. spółdzielnia / firma */
    case '/company-profile': {
      return 'Profil'
    }

    case '/company-dumpsters': {
      return 'Altany śmietnikowe'
    }

    case '/card-orders': {
      return 'Zamówienia kart'
    }

    case '/company-occupants': {
      return 'Użytkownicy'
    }

    default: {
      return ''
    }
  }
}

export const AppLayout: React.FC = () => {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const { id } = useParams()

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <MehOutlined style={{ fontSize: 20 }} />
      <div>Brak danych</div>
    </div>
  )

  return (
    <div className={styles.page}>
      <ConfigProvider
        renderEmpty={customizeRenderEmpty}
        theme={{
          token: {
            fontFamily: 'Inter, sans-serif',
            colorPrimary: '#7dad51',
            colorError: '#c60202',
          },
          components: {
            Button: {
              borderRadius: 5,
              padding: 30,
              colorPrimary: '#7dad51',
            },
          },
        }}
      >
        <App>
          <div className={styles.headerContainer}>
            <header className={styles.header}>
              <h1 className={styles.logo}>
                <Link to="/home" draggable={false}>
                  <img src={logo} alt="logo" draggable={false} />
                </Link>
              </h1>

              {routesWithoutAccount.has(pathname) ? (
                <UnauthenticatedAppMenu />
              ) : (
                <AuthenticatedAppMenu />
              )}
            </header>
            <SessionTimer />
            {user?.basicInfo?.users_statusID === 3 ? null : (
              <>
                <div className={styles.navigationDetails}>
                  <div>
                    {generatePageName(window.location.pathname, id ? id : ' ')}
                  </div>
                  {user?.basicInfo?.users_name}
                </div>
              </>
            )}
          </div>
          <main className={styles.main}>
            <Outlet />
          </main>
        </App>
      </ConfigProvider>
    </div>
  )
}
