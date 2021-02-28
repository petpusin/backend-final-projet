const mongoose = require('mongoose');
const { Schema } = mongoose;
var varaition = new Schema({
    varaition_name: String,
    varaition_price: Number});

module.exports = mongoose.model('varaitions', varaition);