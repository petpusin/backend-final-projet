const mongoose = require('mongoose');
const { Schema } = mongoose;
var orderdetail = new Schema({
    quantity: {type: Number , required: true,default: 1},
    orderlist: { type: Schema.Types.ObjectId, ref: 'menu' },
    ingredient: { id:String,value:Number},
    option: { id:String,value:Number},
    varaition : { id:String,value:Number},
    describe: {type:String}

});

module.exports = mongoose.model('orderdetails', orderdetail);