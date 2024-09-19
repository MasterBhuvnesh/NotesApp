const mongoose = require("mongoose");
const ImgSchema = new mongoose.Schema({
  name: String,
  pics: String, 
});

const ImgModel = mongoose.model("img", ImgSchema);
module.exports = ImgModel;
