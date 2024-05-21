import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa6'
import { SocialIcon } from '../../ui/SocialIcon'
import { ResponsivePicture } from '../../ui/ResponsivePicture'
import { ButtonCustom } from '../../../domains/common/ButtonCustom'
import styles from './Footer.module.scss'
import bgxs from '@/assets/landing/footer/bg-1-xs.svg'
import bgs from '@/assets/landing/footer/bg-2-s.svg'
import bgm from '@/assets/landing/footer/bg-3-m.svg'
import bgl from '@/assets/landing/footer/bg-4-l.svg'
import bgxl from '@/assets/landing/footer/bg-5-xl.svg'
import bgxxl from '@/assets/landing/footer/bg-6-xxl.svg'

export const Footer: React.FC = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.gradient}></div>
      <div className={styles.background}>
        <ResponsivePicture
          xs={bgxs}
          s={bgs}
          m={bgm}
          l={bgl}
          xl={bgxl}
          xxl={bgxxl}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.CTA}>
          <h2>Zacznij z nami dbać o Ziemię!</h2>
          <ButtonCustom
            link="/register"
            content="zarejestruj się już teraz"
            className={styles.footerButton}
          />
        </div>
        <div className={styles.footerFirstContainer}>
          <div className={styles.address}>
            Wsola, Gombrowicza 4
            <br />
            26-660 Jedlińsk
          </div>
          <div className={styles.address}>
            Serwis i reklamacje
            <br />
            <a href="mailto:serwis@smietniki.com" className={styles.mail}>
              serwis@smietniki.com
            </a>
          </div>
        </div>
        <div className={`${styles.address} ${styles.footerSecondContainer}`}>
          Przedstawiciel handlowy
          <br />
          Radosław Spychała
          <br />
          <a href="mailto:r.spychala@balhanger.com" className={styles.mail}>
            mail@mail.com
          </a>
        </div>
        <div className={styles.footerThirdContainer}>
          <div className={styles.socials}>
            <SocialIcon icon={FaFacebookF} />
            <SocialIcon icon={FaLinkedinIn} />
          </div>
          <span className={styles.copy}>© 2023</span>
        </div>
      </div>
    </div>
  )
}
