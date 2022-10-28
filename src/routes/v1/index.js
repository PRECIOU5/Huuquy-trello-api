import express from 'express'
import { HttpStatusCode } from '*/ultilities/constants'
import { boardRouters } from './board.route'

const router = express.Router()
//lấy v1/status
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({ status: 'ok!' }))

// board API
router.use('/boards', boardRouters)

export const apiV1= router


