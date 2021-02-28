const mongoose = require('mongoose');
const { Schema } = mongoose;
var options = new Schema({
    option_name: String,
    option_price: Number});

module.exports = mongoose.model('options', options);