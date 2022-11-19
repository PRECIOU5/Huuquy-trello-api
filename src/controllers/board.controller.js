import { HttpStatusCode } from "*/ultilities/constants";
import { BoardServices } from "*/services/board.service";

const createNew = async (req, res) => {
  try {
    const result = await BoardServices.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    //console.log(error)
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};
const getFullBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BoardServices.getFullBoard(id);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    //console.log(error)
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BoardServices.update(id, req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};
export const BoardController = { createNew, getFullBoard, update };
