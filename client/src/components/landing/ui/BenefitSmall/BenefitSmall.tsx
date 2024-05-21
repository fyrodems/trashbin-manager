import styles from './BenefitSmall.module.scss'

interface BenefitSmallProps {
  image: string
  title: string
}

export const BenefitSmall: React.FC<BenefitSmallProps> = ({ image, title }) => {
  return (
    <div className={styles.smallBenefitsWrapper}>
      <div className={styles.circleDecoration}>
        <img src={image} alt="" />
      </div>
      <span className={styles.benefitTitle}>{title}</span>
    </div>
  )
}
