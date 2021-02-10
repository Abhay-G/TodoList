const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

module.exports.Item = Item;
module.exports.itemsSchema = itemsSchema;

