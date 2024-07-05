// TRANING THE MODEL
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: Number,
  type: String,
  names: Array,
});
const UserModel = mongoose.model("types", UserSchema);
module.exports = UserModel;
