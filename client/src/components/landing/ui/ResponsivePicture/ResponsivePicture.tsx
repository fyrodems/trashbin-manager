import styles from './ResponsivePicture.module.scss'

interface ResponsivePictureProps {
  xs: string
  s: string
  m: string
  l: string
  xl: string
  xxl: string
}

export const ResponsivePicture: React.FC<ResponsivePictureProps> = ({
  xs,
  s,
  m,
  l,
  xl,
  xxl,
}) => {
  return (
    <picture className={styles.picture}>
      {/* <!-- Obrazek dla rozmiaru ekranu extra small (320 - 576px) --> */}
      <source srcSet={xs} media="(max-width: 576px)" />

      {/* <!-- Obrazek dla rozmiaru ekranu small (577 - 768px) --> */}
      <source srcSet={s} media="(min-width: 577px) and (max-width: 768px)" />

      {/* <!-- Obrazek dla rozmiaru ekranu medium (769 - 992px) --> */}
      <source srcSet={m} media="(min-width: 769px) and (max-width: 992px)" />

      {/* <!-- Obrazek dla rozmiaru ekranu large (993 - 1200px) --> */}
      <source srcSet={l} media="(min-width: 993px) and (max-width: 1200px)" />

      {/* <!-- Obrazek dla rozmiaru ekranu extra large (1201 - 1550px) --> */}
      <source srcSet={xl} media="(min-width: 1201px) and (max-width: 1550px)" />

      {/* <!-- Obrazek dla rozmiaru ekranu extra extra large (powyżej 1550px) --> */}
      <source srcSet={xxl} media="(min-width: 1551px)" />

      {/* <!-- Domyślny obrazek, jeśli żaden z powyższych warunków nie zostanie spełniony --> */}
      <img src={xs} alt="Domyślny obrazek" />
    </picture>
  )
}
