import { BoardModel } from '*/models/board.model'

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

    // add card to eeach column
    board.columns.forEach(column => {
      column.cards = board.cards.filter(c => c.columnID.toString() === column._id.toString())
    })
    //sap xep columnOrder, cardOrder
    //remove card data from board
    delete board.cards
    return board
  } catch (error) {
    throw new Error(error)
  }
}
export const BoardServices= { createNew, getFullBoard }