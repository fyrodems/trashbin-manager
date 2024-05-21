import React, {
  /*   type Dispatch, */
  type ReactNode,
  /*   type SetStateAction, */
} from 'react'
import { Button, Modal } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import editIcon from '../../../../assets/editIcon.png'
import styles from './FormModal.module.scss'

interface FormModalProps {
  popupTitle: string
  popupContent?: string
  formNode: ReactNode
  buttonContent: string | ReactNode
  buttonType?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined
  isModalOpen: boolean
  setIsModalOpen: /*  Dispatch<SetStateAction<boolean>> */ (
    prevState: boolean
  ) => void
  isDisabled?: boolean
  isOfficialEditUserAddress?: boolean
  isCompanyAddAddress?: boolean
}

export const FormModal: React.FC<FormModalProps> = ({
  popupTitle,
  popupContent,
  buttonContent,
  buttonType,
  formNode,
  isModalOpen,
  setIsModalOpen,
  isDisabled,
  isOfficialEditUserAddress = false,
  isCompanyAddAddress = false,
}) => {
  return (
    <>
      {isOfficialEditUserAddress ? (
        <Button
          disabled={isDisabled}
          type={'primary'}
          onClick={() => {
            setIsModalOpen(true)
          }}
          className={styles.editButton}
        >
          {isCompanyAddAddress ? (
            <HomeOutlined />
          ) : (
            <img src={editIcon} alt="Edit icon" />
          )}
          {buttonContent}
        </Button>
      ) : (
        <Button
          className={styles.button}
          disabled={isDisabled}
          type={buttonType}
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          {buttonContent}
        </Button>
      )}
      <Modal
        className={styles.modal}
        title={popupTitle}
        open={isModalOpen}
        closeIcon={false}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        footer={null}
        centered
      >
        {popupContent}
        {formNode}
      </Modal>
    </>
  )
}
