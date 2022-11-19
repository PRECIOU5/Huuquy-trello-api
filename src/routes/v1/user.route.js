import { User, validateUser } from "../../models/user.model";
import express from "express";
import { hashPassword } from "../../ultilities/hash";
import jwt from "jsonwebtoken";
import { BoardModel } from "../../models/board.model";

const bcrypt = require("bcrypt");

const userRoute = express.Router();
export const jwtSecret = "jwtPrivateKey";

userRoute.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email }).exec();
  if (user) return res.status(400).send("Tài khoản đã tồn tại!");
  let data = { ...req.body };
  data.password = await hashPassword(data.password);

  const board = await BoardModel.createNew({
    title: "New Board",
  });
  //console.log(board);
  data.boardOwner = board._id;

  user = new User({ ...data });
  await user.save();
  return res.send(user);
});

userRoute.post("/dang-nhap", async (req, res) => {
  let user = await User.findOne({ email: req.body.email }).exec();
  if (!user)
    return res.status(400).send("Tên tài khoản hoặc mật khẩu không đúng!");
  let data = { ...req.body };

  const isPasswordEqual = await bcrypt.compare(data.password, user.password);

  if (!isPasswordEqual)
    return res.status(400).send("Tên tài khoản hoặc mật khẩu không đúng!");

  const token = jwt.sign({ _id: user._id }, jwtSecret);

  return res.send(token);
});

userRoute.get("/me", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denined. No token provided.");

  try {
    const decode = jwt.verify(token, jwtSecret);
    let user = await User.findById(decode._id).select("-password").exec();
    return res.send(user);
  } catch (e) {
    res.status(400).send("Invalid token.");
  }
});

userRoute.post("/invite/:id", async (req, res) => {
  const boardId = req.params.id;
  const email = req.body.email;
  const board = await BoardModel.getFullBoard(boardId);
  if (!board) return res.status(400).send("Không tìm thấy bảng");
  let user = await User.findOne({ email }).exec();
  if (!user) return res.status(400).send("Không tìm thấy người dùng");

  // user chưa được mời thì mời vào. nếu có thì không mời nữa
  if (!user.boards.find((b) => b._id === board._id)) {
    user.boards.push({ _id: board._id, title: board.title });
    user.save();
  }

  return res.send("OK");
});

export default userRoute;
