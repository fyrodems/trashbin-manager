import styles from './PanelContentWrapper.module.scss'

interface PanelContentWrapperProps {
  children: React.ReactNode
}

export const PanelContentWrapper: React.FC<PanelContentWrapperProps> = ({
  children,
}) => {
  return <div className={styles.panelContentWrapper}>{children}</div>
}
