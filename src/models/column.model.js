import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectID } from 'bson'
import { ObjectId } from 'mongodb'


const columnCollectionName = 'columns'

const columnCollectionSchema= Joi.object({
  boardID: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async(data) => {
  return await columnCollectionSchema.validateAsync(data, { abortEarly:false })
}

const createNew = async(data) => {
  try {
    // const value = await validateSchema(data)
    const validatedValue = await validateSchema(data)
    const insertValue={
      ...validatedValue,
      boardID:ObjectId(validatedValue.boardID)

    }
    const result = await getDB().collection(columnCollectionName).insertOne(insertValue)
    const id = result.insertedId
    const response = await getDB().collection(columnCollectionName).findOne({ '_id': new ObjectID(id) })
    return response
    //return result.ops[0]
  } catch (error) {
    throw new Error(error)
  }
}

/**
 *
 * @param {string} columnID
 * @param {string} cardID
 */
const pushCardOrder= async (columnID, cardID) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(columnID) },
      { $push: { cardOrder: cardID } },
      { returnOriginal:false }
    )

    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

const update = async(id, data) => {
  try {
    const updateData ={ ...data }
    if (data.boardID) updateData.boardID = ObjectId(data.boardID)
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateData },
      { returnOriginal:false }
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnModel= { columnCollectionName, createNew, update, pushCardOrder }