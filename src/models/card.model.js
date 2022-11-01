import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectID } from 'bson'
import { ObjectId } from 'mongodb'

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
    //const value = await validateSchema(data)
    const validatedValue = await validateSchema(data)
    const insertValue={
      ...validatedValue,
      boardID: ObjectId(validatedValue.boardID),
      columnID: ObjectId(validatedValue.columnID)
    }
    const result = await getDB().collection(cardCollectionName).insertOne(insertValue)
    const id = result.insertedId
    const response = await getDB().collection(cardCollectionName).findOne({ '_id': new ObjectID(id) })
    return response
    //return result.ops[0]
  } catch (error) {
    throw new Error(error)
  }
}
/**
 * @param {Array of string card id} ids
 */

const deleteMany = async(ids) => {
  try {
    const stansformIds = ids.map(i => ObjectId(i))
    const result = await getDB().collection(cardCollectionName).updateMany(
      { _id: { $in: stansformIds } },
      { $set: { _destroy: true } }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const CardModel= { createNew, cardCollectionName, deleteMany }