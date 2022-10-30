import { HttpStatusCode } from '*/ultilities/constants'
import { ColumnServices } from '*/services/column.service'

const createNew = async(req, res) => {
  try {
    const result = await ColumnServices.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const update = async(req, res) => {
  try {
    const { id }= req.params
    const result = await ColumnServices.update(id, req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const ColumnController = { createNew, update }