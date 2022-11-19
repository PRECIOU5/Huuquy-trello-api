import { HttpStatusCode } from '*/ultilities/constants'
import { CardServices } from '*/services/card.service'

const createNew = async(req, res) => {
  try {
    const result = await CardServices.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    //console.log(error)
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}
const update = async(req, res) => {
  try {
    const { id }= req.params
    const result = await CardServices.update(id, req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}
export const CardController = { createNew, update }