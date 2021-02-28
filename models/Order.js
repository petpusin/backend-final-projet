const mongoose = require('mongoose');
const { Schema } = mongoose;
var order = new Schema({
   res_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
   cus_id: { type: Schema.Types.ObjectId, ref: 'customer' },
   orderDetail: [{ type: Schema.Types.ObjectId, ref: 'orderdetails' }],
   totalPrice : {type: Number},
   status: {type: String, required: true , default: "Waiting"},
   dateOrderStart:{type: Date , default: Date.now},
   dateOrderFinish:{type: Date ,default: undefined}



});

module.exports = mongoose.model('order', order);