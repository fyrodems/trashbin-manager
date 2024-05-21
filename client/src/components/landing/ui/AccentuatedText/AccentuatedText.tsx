import { type ReactNode } from 'react'
import styles from './AccentuatedText.module.scss'

interface AccentuatedTextProps {
  children: ReactNode
}

export const AccentuatedText: React.FC<AccentuatedTextProps> = ({
  children,
}) => {
  return (
    <div className={styles.accentuatedText}>
      <div></div>
      <p className={styles.paragraph}>{children}</p>
    </div>
  )
}
