import { ExclamationCircleTwoTone } from '@ant-design/icons'
import { Popover } from 'antd'
import { useState } from 'react'
import classNames from 'classnames'
import styles from './ValidationError.module.scss'
import { toggleState } from '@/utils/functions'

const PopoverContent: React.FC<{ error: string | string[] }> = ({ error }) => {
  return (
    <div className={styles.popoverContent}>
      {Array.isArray(error) ? (
        error.map((item, index) => <span key={index}>{item}</span>)
      ) : (
        <span>{error}</span>
      )}
    </div>
  )
}

export const ValidationError: React.FC<{
  error: string | string[] | null
  className?: string
}> = ({ error, className }) => {
  const [isPopoverClicked, setIsPopoverClicked] = useState<boolean>(false)

  const handleClickChange = () => {
    toggleState(isPopoverClicked, setIsPopoverClicked)
  }

  if (!error) return null

  return (
    <div data-role="status" className={classNames(styles.status, className)}>
      <Popover
        content={<PopoverContent error={error} />}
        trigger="click"
        open={isPopoverClicked}
        onOpenChange={handleClickChange}
      >
        <ExclamationCircleTwoTone
          twoToneColor={'red'}
          className={styles.errorIcon}
        />
      </Popover>
    </div>
  )
}
