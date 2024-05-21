import { Navigate } from 'react-router-dom'
import { useAuth } from '../../auth/authProvider'
import styles from './Root.module.scss'
import { Header } from '@/components/landing/views/Header'
import { MainBanner } from '@/components/landing/views/MainBanner'
import { VideoPlayer } from '@/components/landing/views/VideoPlayer'
import { BenefitSegment } from '@/components/landing/views/BenefitSegment'
import { BenefitSmall } from '@/components/landing/ui/BenefitSmall'
import { OfferSegment } from '@/components/landing/views/OfferSegment'
import { Gallery } from '@/components/landing/views/Gallery'
import { Footer } from '@/components/landing/views/Footer'
/* import smietnikomat from '@/assets/landing/benefits/smietnikomat.png' */
import appPreview from '@/assets/landing/benefits/appPreview.svg'
import smietnikomatWithBg from '@/assets/landing/benefits/smietnikomatWithBg.png'
/* import availability from '@/assets/landing/benefits/availability.svg' */
import csrIcon from '@/assets/landing/smallBenefits/csr-icon.svg'
import cmsIcon from '@/assets/landing/smallBenefits/cms-icon.svg'
import chartIcon from '@/assets/landing/smallBenefits/chart-icon.svg'
import notificationIcon from '@/assets/landing/smallBenefits/notification-icon.svg'

export const Root: React.FC = () => {
  const { loggedIn } = useAuth()

  if (loggedIn) {
    return <Navigate to="/home" />
  }

  return (
    <main>
      <Header />
      <MainBanner />
      <div className={styles.videoWrapper}>
        <VideoPlayer title="Karty dostępu" />
        <VideoPlayer title="Dokładne raporty" />
        <VideoPlayer title="W twojej okolicy" />
      </div>
      <BenefitSegment
        title="Rewolucja zarządzania odpadami"
        image={undefined}
        type="1"
      >
        Ciesz się korzyściami wynikającymi z nowej generacji altan
        śmietnikowych, które rewolucjonizują sposób, w jaki segregujemy odpady.
        Wszystko po to, abyśmy mogli wspólnie zadbać o naszą planetę.
      </BenefitSegment>
      <div className={styles.smallBenefitSegment}>
        <BenefitSmall image={csrIcon} title="eksportowanie raportów csr" />
        <BenefitSmall image={cmsIcon} title="zarządzanie treściami" />
        <BenefitSmall image={chartIcon} title="statystyki zebranych odpadów" />
        <BenefitSmall
          image={notificationIcon}
          title="powiadomienia zebranych śmieci"
        />
      </div>
      {/* <img src={appPreview} alt="" className={styles.appPreviewImage} /> */}
      <BenefitSegment
        title="Dezaktywacja konta"
        image={smietnikomatWithBg}
        buttonContent="Dezaktywuj konto"
        isReversed
        isGreen
        type="2"
      >
        Twoje zadowolenie jest dla nas priorytetem, dlatego umożliwiamy Ci
        dezaktywację konta w dowolnym momencie. Dezaktywacja spowoduje
        zamknięcie Twojego konta i utratę dostępu do wszystkich funkcji i
        treści. Jeśli jesteś gotowy na tę decyzję, prosimy o skorzystanie z
        opcji dezaktywacji, którą znajdziesz w ustawieniach konta.
      </BenefitSegment>
      <BenefitSegment
        title="Nasze Altany są dostępne na terenie całej Polski"
        image={appPreview}
        buttonContent="Zaloguj się"
        isReversed
        type="3"
      >
        Nasze altany śmietnikowe są teraz dostępne na terenie całej Polski!
        <br />
        Dzięki nim, dbanie o porządek i estetykę otoczenia staje się łatwiejsze.
        Zaloguj się, aby dowiedzieć się więcej i zyskać dostęp do naszych
        funkcjonalnych rozwiązań!
      </BenefitSegment>
      <OfferSegment />
      <Gallery />
      <Footer />
    </main>
  )
}
