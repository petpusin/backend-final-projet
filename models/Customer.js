const mongoose = require('mongoose');
const { Schema } = mongoose;
const CustomerShcema = new Schema({
    cus_firstname: {
        type: String,
        required: true
    },
    cus_lastname: {
        type: String,
        required: true
    },
    cus_age: {
        type: Number,
        required: true
    },
    cus_phone: {
        type: String,
        required: true
    },
    cus_email: {
        type: String,
        required: true
    },
    career: {type: String , required: true},
    careerDetail: {type: String},
    acc_id :{ type: Schema.Types.ObjectId, ref: 'accId' ,required: true },

    

}, { timestamps: true });

// CustomerShcema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// CustomerShcema.set('toJSON', {
//     virtuals: true,
// });

module.exports = mongoose.model('customer', CustomerShcema);