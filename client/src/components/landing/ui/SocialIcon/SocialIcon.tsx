import React from 'react'
import { type IconType } from 'react-icons'
import styles from './SocialIcon.module.scss'

interface SocialIconProps {
  icon?: IconType
}

export const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => {
  const IconComponent = icon

  return (
    <div className={styles.socialIcon}>
      <IconComponent />
    </div>
  )
}
