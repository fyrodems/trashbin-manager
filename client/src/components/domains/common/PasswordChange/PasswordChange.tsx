import { useState } from 'react'
import { Button } from 'antd'
import { PasswordUpdate } from '../../user/profile/PasswordUpdate'

export const PasswordChange = () => {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)

  return (
    <>
      <Button
        type="default"
        block
        onClick={() => {
          setPasswordModalOpen(true)
        }}
      >
        Zmień hasło
      </Button>

      <PasswordUpdate open={passwordModalOpen} setOpen={setPasswordModalOpen} />
    </>
  )
}
