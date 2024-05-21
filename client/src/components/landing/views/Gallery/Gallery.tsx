import styles from './Gallery.module.scss'
import photo1 from '@/assets/landing/gallery/photo1.png'
import photo2 from '@/assets/landing/gallery/photo2.png'
import photo3 from '@/assets/landing/gallery/photo3.png'
import photo4 from '@/assets/landing/gallery/photo4.png'
import photo5 from '@/assets/landing/gallery/photo5.png'
import photo6 from '@/assets/landing/gallery/photo6.png'

export const Gallery: React.FC = () => {
  return (
    <section className={styles.gallery}>
      <h2 className={styles.title}>
        Najlepsze rozwiązanie dla
        <br />
        Osiedli, gmin i powiatów
      </h2>
      <div className={styles.photoWrapper}>
        <img src={photo1} alt="" />
        <img src={photo2} alt="" />
        <img src={photo3} alt="" />
        <img src={photo4} alt="" />
        <img src={photo5} alt="" />
        <img src={photo6} alt="" />
      </div>
    </section>
  )
}
