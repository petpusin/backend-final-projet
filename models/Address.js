const mongoose = require('mongoose');
const { Schema } = mongoose;
var address = new Schema({
    addr_line1: {type: String,required:true},
    road: {type: String,required:true},
    subdistrict: {type: String,required:true},
    district: {type: String,required:true},
    province: {type: String,required:true},
    postalcode: {type: String,required:true}

    },{ timestamps: true });

module.exports = mongoose.model('address', address);