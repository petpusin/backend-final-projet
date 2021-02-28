const mongoose = require('mongoose');
const { Schema } = mongoose;
var address = new Schema({
    addr_line1: {type: String,required:true},
    addr_line2: String,
    state: {type: String,required:true},
    city: {type: String,required:true},
    postal_code: {type: String,required:true}},{ timestamps: true });

module.exports = mongoose.model('address', address);