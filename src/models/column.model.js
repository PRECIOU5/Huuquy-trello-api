import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectID } from 'bson'
import { ObjectId } from 'mongodb'


const columnCollectionName = 'columns'

const columnCollectionSchema= Joi.object({
  boardID: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
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
    const value = await validateSchema(data)
    const result = await getDB().collection(columnCollectionName).insertOne(value)
    const id = result.insertedId
    const response = await getDB().collection(columnCollectionName).findOne({ '_id': new ObjectID(id) })
    return response
  } catch (error) {
    throw new Error(error)
  }
}

const update = async(id, data) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data },
      { returnOriginal:false }
    )
    console.log(result)
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}

export const ColumnModel= { createNew, update }