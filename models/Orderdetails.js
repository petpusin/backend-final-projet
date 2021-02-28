const mongoose = require('mongoose');
const { Schema } = mongoose;
var orderdetail = new Schema({
    quantity: {type: Number , required: true,default: 0},
    orderlist: { type: Schema.Types.ObjectId, ref: 'menu' },
    ingredient: {type: Schema.Types.ObjectId, ref: 'ingredients'},
    option: {type: Schema.Types.ObjectId, ref: 'options'},
    varaition : {type: Schema.Types.ObjectId, ref: 'varaitions'}

});

module.exports = mongoose.model('orderdetails', orderdetail);