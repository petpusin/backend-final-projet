const mongoose = require('mongoose');
const { Schema } = mongoose;

var menus = new Schema({
    menu_name: {type: String,required:true},
    
    describe: {type: String},
    price: {type: Number,required:true},
    type_menu: {type: Schema.Types.ObjectId, ref: 'type_menu' , required:true},
    active: Boolean,
    menu_image: {type: String}
    
},{ timestamps: true });

module.exports = mongoose.model('menu', menus);