var mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  order: Number,
  isDelete: Boolean,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
});

module.exports = mongoose.model("category", categorySchema);
