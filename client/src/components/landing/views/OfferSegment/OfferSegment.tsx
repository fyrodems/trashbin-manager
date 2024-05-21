import { ButtonCustom } from '../../../domains/common/ButtonCustom'
import styles from './OfferSegment.module.scss'
import offerImg from '@/assets/landing/smietnikomat-offer.png'

export const OfferSegment: React.FC = () => {
  return (
    <section className={styles.offerSegment}>
      <img src={offerImg} alt="smietnikomat" />

      <div className={styles.offerWrapper}>
        <h2>Otrzymaj ofertę jeszcze dziś</h2>
        <p>
          Pozostaw nam wiadomość, a skontaktujemy się
          <br />z Tobą tak szybko, jak to tylko możliwe!
        </p>
        <ButtonCustom
          link="/"
          content="Skontaktuj się"
          className={styles.button}
        />
      </div>
    </section>
  )
}
