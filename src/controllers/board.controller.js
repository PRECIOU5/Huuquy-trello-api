import { HttpStatusCode } from '*/ultilities/constants'
import { BoardServices } from '*/services/board.service'

const createNew = async(req, res) => {
  try {
    const result = await BoardServices.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    console.log(error)
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}
export const BoardController = { createNew }