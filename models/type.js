const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  names: [
    {
      name: { type: String, required: true },
      status: { type: String, required: true },
    },
  ],
});

const TypeModel = mongoose.model("animelist", TypeSchema);

module.exports = TypeModel;
