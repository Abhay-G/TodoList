const mongoose = require("mongoose");
const { itemsSchema } = require("./itemModel.js");
const listSchema = mongoose.Schema({
  name: String,
  lists: [itemsSchema],
});
const List = mongoose.model("List", listSchema);
module.exports = List;
