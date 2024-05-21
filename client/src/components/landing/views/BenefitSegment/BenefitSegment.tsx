import { type ReactNode } from 'react'
import { AccentuatedText } from '../../ui/AccentuatedText'
import { ButtonCustom } from '../../../domains/common/ButtonCustom'
import styles from './BenefitSegment.module.scss'

interface BenefitSegmentProps {
  title: string
  image?: string
  type?: string
  buttonContent?: string
  children: ReactNode
  isReversed?: boolean
  isGreen?: boolean
}

export const BenefitSegment: React.FC<BenefitSegmentProps> = ({
  title,
  image,
  type,
  isReversed,
  isGreen,
  buttonContent,
  children,
}) => {
  const generateClassForImage = (type: string) => {
    switch (type) {
      case '1': {
        return 'firstImage'
      }

      case '2': {
        return 'secondImage'
      }

      case '3': {
        return 'thirdImage'
      }

      default: {
        return 'image'
      }
    }
  }

  return (
    <section
      className={`${styles.benefitSegment} ${isGreen ? styles.greenBg : ''}`}
    >
      <div className={isReversed ? styles.reversed : styles.notReversed}>
        <h2>{title}</h2>
        {image ? (
          <img
            src={image}
            alt={title}
            className={type ? styles[generateClassForImage(type)] : ''}
          />
        ) : null}
      </div>
      <div className={styles.textWrapper}>
        <AccentuatedText>{children}</AccentuatedText>
        {buttonContent ? (
          <ButtonCustom
            link="/login"
            content={buttonContent}
            className={styles.button}
          />
        ) : null}
      </div>
    </section>
  )
}
