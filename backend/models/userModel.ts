import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    flags: { type: Array<String>() },
    wishes: { type: Array<String>() },
  },
  { collection: "users" }
);

const userInfo = mongoose.model("users", UserSchema);

module.exports = userInfo;
