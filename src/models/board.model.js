import Joi from "joi";
import { getDB } from "*/config/mongodb";
import { ObjectID } from "bson";
import { ObjectId } from "mongodb";
import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";

const boardCollectionName = "boards";

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(30).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};
// tạo mới
const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);
    const id = result.insertedId;
    const response = await getDB()
      .collection(boardCollectionName)
      .findOne({ _id: new ObjectID(id) });
    //console.log(response);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteBoard = async (id) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .deleteOne({ __id: id });

    return "OK";
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data };
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnOriginal: false }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {string} boardID
 * @param {string} columnID
 */
const pushColumnOrder = async (boardID, columnID) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardID) },
        { $push: { columnOrder: columnID } },
        { returnOriginal: false }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};
//lấy dữ liệu của column và card
const getFullBoard = async (boardID) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        { $match: { _id: ObjectId(boardID), _destroy: false } },

        // {
        //   $addFields: {
        //     _id:{ $toString:'$_id'}
        //   }
        // },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName, // tên bảng cần lấy
            localField: "_id",
            foreignField: "boardID",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName, // tên bảng cần lấy
            localField: "_id",
            foreignField: "boardID",
            as: "cards",
          },
        },
      ])
      .toArray();
    // const id = result.insertedId
    // const response = await getDB().collection(boardCollectionName).findOne({ '_id': new ObjectID(id) })
    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

export const BoardModel = {
  createNew,
  getFullBoard,
  pushColumnOrder,
  update,
  deleteBoard,
};
