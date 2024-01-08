var mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  isDelete: { type: Boolean, default: false },
  order: Number,
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
});
productSchema.pre("save", function (next) {
  if (this.isNew) {
    this.isDelete = false;
  }
  next();
});
module.exports = mongoose.model("product", productSchema);
