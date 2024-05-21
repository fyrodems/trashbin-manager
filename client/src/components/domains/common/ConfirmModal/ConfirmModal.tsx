import React, { type ReactNode, useState } from 'react'
import { Button, Modal } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

interface ConfirmModalProps {
  popupTitle: string
  popupContent?: string
  closeIcon?: ReactNode
  buttonContent: string | ReactNode
  confirmFunction: () => void
  isDisabled?: boolean
  buttonType?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined
  isDanger?: boolean
  isOfficialDeleteAddress?: boolean
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  popupTitle,
  popupContent,
  buttonContent,
  confirmFunction,
  buttonType,
  isDanger,
  isDisabled,
  isOfficialDeleteAddress = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      {isOfficialDeleteAddress ? (
        <Button
          type={buttonType}
          disabled={isDisabled}
          danger={isDanger}
          onClick={() => {
            setIsModalOpen(true)
          }}
          children={
            <>
              <CloseCircleOutlined /> {buttonContent}
            </>
          }
        />
      ) : (
        <Button
          style={{ borderRadius: '5px' }}
          type={buttonType}
          disabled={isDisabled}
          danger={isDanger}
          onClick={() => {
            setIsModalOpen(true)
          }}
          children={buttonContent}
        />
      )}
      <Modal
        title={popupTitle}
        open={isModalOpen}
        closeIcon={false}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        centered
        footer={
          <>
            <Button
              style={{ borderRadius: '5px' }}
              children={'Nie'}
              onClick={() => {
                setIsModalOpen(false)
              }}
            />
            <Button
              style={{ borderRadius: '5px' }}
              danger={isDanger}
              type="primary"
              children={'Tak'}
              onClick={() => {
                setIsModalOpen(false)
                confirmFunction()
              }}
            />
          </>
        }
      >
        {popupContent}
      </Modal>
    </>
  )
}
