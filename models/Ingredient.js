const mongoose = require('mongoose');
const { Schema } = mongoose;
var ingredients = new Schema({
    label: String,
    value: Number});

module.exports = mongoose.model('ingredients', ingredients);