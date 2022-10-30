import express from 'express'
import { HttpStatusCode } from '*/ultilities/constants'
import { boardRouters } from './board.route'
import { columnRoutes} from './column.route'
import { cardRoutes } from './card.route'
const router = express.Router()
//lấy v1/status
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({ status: 'OK!' }))

// board API
router.use('/boards', boardRouters)
// column API
router.use('/columns', columnRoutes)
// card API
router.use('/cards', cardRoutes)
export const apiV1= router


