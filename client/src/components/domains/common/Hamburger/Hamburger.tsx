import { useState, useEffect } from 'react'
import { Divide as Hamburger } from 'hamburger-react'

interface HamburgerMenuProps {
  setDropdownOpen: (isOpen: boolean) => void
  isDropdownOpen: boolean
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  setDropdownOpen,
  isDropdownOpen,
}) => {
  //! Czy na pewno potrzebne?
  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleBurger = () => {
    if (isDropdownOpen) {
      setOpen((state) => !state)
    }

    setDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    if (!isDropdownOpen) {
      setOpen(false)
    }
  }, [isDropdownOpen])

  return (
    <Hamburger toggled={isDropdownOpen} toggle={toggleBurger} color="#7DAD51" />
  )
}
