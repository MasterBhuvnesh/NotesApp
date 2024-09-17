const mongoose = require("mongoose");
const ImgSchema = new mongoose.Schema({
});
const ImgModel = mongoose.model("img", ImgSchema);
module.exports = ImgModel;
