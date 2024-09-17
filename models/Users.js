// TRANING THE MODEL
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
});
const UserModel = mongoose.model("styles", UserSchema);
module.exports = UserModel;
