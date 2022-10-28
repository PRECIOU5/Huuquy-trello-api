import { HttpStatusCode } from '*/ultilities/constants'
import { BoardServices } from '*/services/board.service'

const createNew = async(req, res) => {
  try {
    const result = await BoardServices.createNew(req.body)
    console.log(result)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}
export const BoardController = { createNew }