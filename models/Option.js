const mongoose = require('mongoose');
const { Schema } = mongoose;
var options = new Schema({
    label: String,
    value: Number});

module.exports = mongoose.model('options', options);