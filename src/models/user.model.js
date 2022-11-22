import mongoose from "mongoose";
import Joi from "joi";

mongoose.connect(
  "mongodb+srv://huuquy:mM21092001@cluster0.ikci0mr.mongodb.net/trello-huuquy",
  () => {
    console.log("mongodb has been connected successfully!");
  }
);

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  boards: [],
  boardOwner: {
    type: mongoose.Types.ObjectId,
    ref: "Board",
  },
});

export const User = mongoose.model("User", userSchema);

export const validateUser = (user) => {
  const schema = Joi.object({
    fullName: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(user);
};
