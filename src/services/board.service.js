import { BoardModel } from '*/models/board.model'
import { cloneDeep} from 'lodash'

const createNew = async(data) => {
  try {
    const result = await BoardModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getFullBoard = async(boardID) => {
  try {
    const board = await BoardModel.getFullBoard(boardID)

    if (!board || !board.columns) {
      throw new Error('Khong co bang nao')
    }
    const transformBoard = cloneDeep(board)
    transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)
    // add card to eeach column
    transformBoard.columns.forEach(column => {
      column.cards = transformBoard.cards.filter(c => c.columnID.toString() === column._id.toString())
    })
    //sap xep columnOrder, cardOrder
    //remove card data from board
    delete transformBoard.cards
    return transformBoard
  } catch (error) {
    throw new Error(error)
  }
}
export const BoardServices= { createNew, getFullBoard }