import { useState, useEffect, useRef, type MouseEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { HamburgerMenu } from '../../../domains/common/Hamburger'
import { ButtonCustom } from '../../../domains/common/ButtonCustom'
import styles from './Header.module.scss'
import { isMobileWidth } from '@/utils/functions'
import logo from '@/assets/BAL-logo.svg'

export const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick)

    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const mobileNavBar = (
    <>
      <div className={`${styles.headerContainer} ${styles.headerBg}`}>
        <HamburgerMenu
          setDropdownOpen={setDropdownOpen}
          isDropdownOpen={isDropdownOpen}
        />
        <img src={logo} alt="logo" draggable={false} />
        <div className={styles.healper}></div>
      </div>
      {isDropdownOpen && (
        <nav className={`${styles.mobileNavigation} ${styles.headerBg}`}>
          <ul>
            <li>
              <NavLink to="/">Mapa naszych śmietników</NavLink>
            </li>
            <li>
              <NavLink to="/">Oferty</NavLink>
            </li>
            <li>
              <NavLink to="/home">Moje konto</NavLink>
            </li>
          </ul>
          <ButtonCustom
            link="/login"
            content="Zaloguj się"
            className={styles.button}
          />
        </nav>
      )}
    </>
  )

  const desktopNavBar = (
    <div className={`${styles.headerContainer} ${styles.headerBg}`}>
      <img src={logo} alt="logo" draggable={false} />
      <nav className={`${styles.desktopNavigation}`}>
        <ul>
          <li>
            <NavLink to="/" className={styles.actualText} draggable={false}>
              Mapa naszych śmietników
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={styles.actualText} draggable={false}>
              Oferty
            </NavLink>
          </li>
          <li>
            <NavLink to="/home" className={styles.actualText} draggable={false}>
              Moje konto
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      <div data-name="dropdownRef" ref={dropdownRef}>
        {isMobileWidth() ? mobileNavBar : desktopNavBar}
      </div>
    </>
  )
}
