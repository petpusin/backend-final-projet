const mongoose = require('mongoose');
const { Schema } = mongoose;
var varaition = new Schema({
    label: String,
    value: Number});

module.exports = mongoose.model('varaitions', varaition);