import Joi from 'joi'
import { HttpStatusCode } from '*/ultilities/constants'

const createNew = async(req, res, next) => {
  const condition = Joi.object({
    boardID: Joi.string().required(),
    columnID: Joi.string().required(),
    title: Joi.string().required().min(3).max(50).trim()
  })
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message
    })
  }
}
const update = async(req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().min(3).max(30).trim(),
    boardID: Joi.string(),
    columnID: Joi.string()
  })
  try {
    await condition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(error).message
    })
  }
}
export const CardValidation = { createNew, update }