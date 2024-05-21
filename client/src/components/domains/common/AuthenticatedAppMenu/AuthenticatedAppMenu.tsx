import { useEffect, useRef, useState, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from 'antd'
import styles from './AuthenticatedAppMenu.module.scss'
import { useAuth } from '@/auth/authProvider'
import { logout } from '@/auth/authClient'
import { HamburgerMenu } from '@/components/domains/common/Hamburger'
import { isMobileWidth } from '@/utils/functions'

const userMenuList = [
  { label: 'Mój profil', link: '/profile' },
  { label: 'Statystyki', link: '/statistics' },
  { label: 'Karty dostępu', link: '/cards' },
  { label: 'Przegląd wniosków', link: '/applications' },
]

const officialMenuList = [
  { label: 'Wyszukiwarka użytkowników', link: '/users' },
  { label: 'Utwórz konto użytkownika', link: '/create-user' },
  { label: 'Altany śmietnikowe', link: '/dumpster' },
  { label: 'Archiwalne wnioski', link: '/archived-applications' },
]

const superOfficialMenuList = [
  { label: 'Wyszukiwarka użytkowników', link: '/users' },
  { label: 'Utwórz konto użytkownika', link: '/create-user' },
  { label: 'Lista urzędników', link: '/officials' },
  { label: 'Altany śmietnikowe', link: '/dumpster' },
  { label: 'Archiwalne wnioski', link: '/archived-applications' },
]

const companyMenuList = [
  { label: 'Mój profil', link: '/company-profile' },
  { label: 'Altany śmietnikowe', link: '/company-dumpsters' },
  { label: 'Karty dostępu', link: '/cards' },
  { label: 'Zamówienia kart', link: '/card-orders' },
]

const housingAssociationsMenuList = [
  { label: 'Mój profil', link: '/company-profile' },
  { label: 'Użytkownicy w spółdzielni', link: '/company-occupants' },
  { label: 'Altany śmietnikowe', link: '/company-dumpsters' },
  { label: 'Karty dostępu', link: '/cards' },
  { label: 'Zamówienia kart', link: '/card-orders' },
]

const userMenuType: Record<number, Array<{ label: string; link: string }>> = {
  4: userMenuList,
  5: officialMenuList,
  6: superOfficialMenuList,
  9: companyMenuList,
  10: housingAssociationsMenuList,
}

export const AuthenticatedAppMenu: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { loggedIn, loading, user } = useAuth()

  const menuList = user?.userType ? userMenuType[user.userType] : []

  // dropdown ref
  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    },
    [setDropdownOpen]
  )

  const handleNavLinkClick = () => {
    setDropdownOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick)

    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  if (loading || !loggedIn) {
    return null
  }

  /* menu */

  const mobileNavBar = (
    <>
      <div>
        <HamburgerMenu
          setDropdownOpen={setDropdownOpen}
          isDropdownOpen={isDropdownOpen}
        />
      </div>
      {isDropdownOpen && (
        <nav className={`${styles.mobileNavigation}`}>
          <ul>
            {menuList?.map((menuItem, i) => {
              return (
                <li key={i}>
                  <NavLink onClick={handleNavLinkClick} to={menuItem.link}>
                    {menuItem.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          <div className={styles.accountWrapper}>
            <div className={styles.userName}>{user?.basicInfo?.users_name}</div>
            <div className={styles.userActions}>
              <Link to="/">
                <Button
                  onClick={logout}
                  type="primary"
                  className={styles.logoutButton}
                >
                  Wyloguj
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  )

  const desktopNavBar = (
    <div>
      <nav className={`${styles.desktopNavigation}`}>
        <ul>
          {menuList?.map((menuItem, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={menuItem.link}
                  draggable={false}
                  className={({ isActive }) =>
                    isActive ? styles.activeNav : ''
                  }
                >
                  {menuItem.label}
                </NavLink>
              </li>
            )
          })}
          <Button
            onClick={logout}
            type="primary"
            className={styles.logoutButton}
          >
            Wyloguj
          </Button>
        </ul>
      </nav>
    </div>
  )

  return (
    <div
      className={styles.menuWrapper}
      data-name="dropdownRef"
      ref={dropdownRef}
    >
      {isMobileWidth() ? mobileNavBar : desktopNavBar}
    </div>
  )
}
