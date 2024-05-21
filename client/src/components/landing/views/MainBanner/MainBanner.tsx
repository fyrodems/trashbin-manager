import styles from './MainBanner.module.scss'
import { ButtonCustom } from '@/components/domains/common/ButtonCustom'

export const MainBanner: React.FC = () => {
  return (
    <div className={styles.mainBanner}>
      <div className={styles.warpper}>
        <h1 className={styles.title}>
          Dystrybutor inteligentnych śmietników
          <span>
            {' '}
            w <span>Polsce</span>
          </span>
        </h1>
        <ButtonCustom
          link="/home"
          content="Przejdź do aplikacji"
          className={styles.button}
        />
      </div>
    </div>
  )
}
