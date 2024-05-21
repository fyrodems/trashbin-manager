import { useState } from 'react'
import { Popover } from 'antd'
import { ExclamationCircleTwoTone } from '@ant-design/icons'
import styles from './CompanyDumpsterCardTitle.module.scss'
import { type CompanyDumpsterCardTitleProps } from './interfaces'

export const CompanyDumpsterCardTitle: React.FC<
  CompanyDumpsterCardTitleProps
> = ({ dumpster }) => {
  const [isPopoverClicked, setIsPopoverClicked] = useState<boolean>(false)

  const handleClickChange = (open: boolean) => {
    setIsPopoverClicked(open)
  }

  const popoverContent = (
    <div className={styles.popoverContent}>
      <span>Altana jest uszkodzona</span>
      <span>Skontaktuj się z pomocą techniczną</span>
    </div>
  )

  return (
    <div className={styles.cardTitleWrapper}>
      <span>Altana śmietnikowa nr {dumpster.dumpster_name}</span>
      {dumpster.dumpster_hasError && (
        <Popover
          content={popoverContent}
          trigger="click"
          open={isPopoverClicked}
          onOpenChange={handleClickChange}
        >
          <ExclamationCircleTwoTone
            twoToneColor={'red'}
            className={styles.errorIcon}
          />
        </Popover>
      )}
    </div>
  )
}
