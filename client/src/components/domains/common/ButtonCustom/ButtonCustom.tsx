import { Link } from 'react-router-dom'
import styles from './ButtonCustom.module.scss'

interface ButtonCustomProps {
  link?: string
  content?: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
}

export const ButtonCustom: React.FC<ButtonCustomProps> = ({
  link,
  content,
  children,
  className,
}) => {
  const button = (
    <button className={`${styles.button} ${className ?? ''}`}>
      {content}
      {children}
    </button>
  )

  if (!link) return button

  return <Link to={link}>{button}</Link>
}
