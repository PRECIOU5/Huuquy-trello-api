import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectID } from 'bson'
//
const cardCollectionName = 'cards'

const cardCollectionSchema= Joi.object({
  boardID: Joi.string().required(),
  columnID: Joi.string().required(),
  title:Joi.string().required().min(3).max(50).trim(),
  cover:Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async(data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly:false })
}

const createNew = async(data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(cardCollectionName).insertOne(value)
    const id = result.insertedId
    const response = await getDB().collection(cardCollectionName).findOne({ '_id': new ObjectID(id) })
    return response
  } catch (error) {
    throw new Error(error)
  }
}
export const CardModel= { createNew }