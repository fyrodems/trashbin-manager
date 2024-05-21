import styles from './PanelDetails.module.scss'

interface PanelDetailsProps {
  title: string
  value?: string | number | null
}

export const PanelDetails: React.FC<PanelDetailsProps> = ({ title, value }) => {
  return (
    <div className={styles.panelDetails}>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}
