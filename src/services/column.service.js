import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { CardModel } from '*/models/card.model'
import { date } from 'joi'

const createNew = async(data) => {
  try {
    const newColumn = await ColumnModel.createNew(data)
    newColumn.cards = []
    // cập nhật lại columnOrder array
    await BoardModel.pushColumnOrder(newColumn.boardID.toString(), newColumn._id.toString())

    return newColumn
  } catch (error) {
    throw new Error(error)
  }
}

const update = async(id, data) => {
  try {
    const updateData= {
      ...data,
      updatedAt: Date.now()
    }
    if (updateData._id) delete updateData._id
    if (updateData.cards) delete updateData.cards

    const updatedColumn = await ColumnModel.update(id, updateData)
    if (updatedColumn._destroy) {
      // delete many card in this column
      CardModel.deleteMany(updatedColumn.cardOrder)
    }
    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}
export const ColumnServices= { createNew, update }