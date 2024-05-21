import styles from './PanelHeader.module.scss'

interface PanelHeaderProps {
  title: string
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ title }) => {
  return <div className={styles.panelHeader}>{title}</div>
}
