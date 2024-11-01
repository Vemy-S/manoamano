import Router from 'express'
import { test } from '../controllers/authTestControllers'
import { authenticate } from '../middleware/authenticate'

const router = Router()

router.get('/auth', authenticate, test)
router.get('/ping', (req, res) => {
    res.json('pong')
})




export default router