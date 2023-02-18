const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create  a Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Items", ItemSchema);
module.exports = Item;
