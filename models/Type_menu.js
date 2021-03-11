const mongoose = require('mongoose');
const { Schema } = mongoose;
var type_menu = new Schema({
    type_name: {type: String, require: true},
    descirbe: {type: String}});

module.exports = mongoose.model('type_menus', type_menu);