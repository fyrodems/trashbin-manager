import styles from './PanelDetailsSection.module.scss'

interface PanelDetailsSectionProps {
  children: React.ReactNode
}

export const PanelDetailsSection: React.FC<PanelDetailsSectionProps> = ({
  children,
}) => {
  return <div className={styles.applicationDetails}>{children}</div>
}
