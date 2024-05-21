import { Router } from 'express'
import { renew } from './renew.controller'
import { logout } from './logout.controller'

// eslint-disable-next-line new-cap
const router = Router()

router.get('/renew', renew)
router.get('/logout', logout)

export default router
