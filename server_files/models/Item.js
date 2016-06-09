'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let itemsSchema = mongoose.Schema({
  author: { type: String, required: true },
  itemType: String,
  itemName: String,
  imageURL: String,
  caption: String,
  exp: Date,
  qty: Number,
  qtyType: String,
  cost: Number,
  storageType: String
});

module.exports = mongoose.model('Item', itemsSchema);
