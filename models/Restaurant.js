const mongoose = require('mongoose');


const { Schema } = mongoose;

const RestaurantSchema = new Schema({
    restaurant_name: {type: String,required:true},
    address: [{ type: Schema.Types.ObjectId, ref: 'address' }],
    open_status: { type: Boolean, default: false },
    menus: [{ type: Schema.Types.ObjectId, ref: 'menu' , default: null}],
    ingredient: [{type: Schema.Types.ObjectId, ref: 'ingredients',default: null}],
    option: [{type: Schema.Types.ObjectId, ref: 'options',default: null}],
    varaition : [{type: Schema.Types.ObjectId, ref: 'varaitions',default: null}],
    approve_status:{type: String,default: "Not Approve"},
    res_image : {type: String}
    
},{ timestamps: true });


module.exports  =  mongoose.model('restaurant', RestaurantSchema);
