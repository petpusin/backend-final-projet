const mongoose = require('mongoose');
const { Schema } = mongoose;
const SalesSchema = new Schema({
    sale_firstname: {
        type: String,
        required: true
    },
    sale_lastname: {
        type: String,
        required: true
    },
    sale_age: {
        type: Number,
        required: true
    },
    sale_phone: {
        type: String,
        required: true
    },
    sale_email: {
        type: String,
        required: true
    },
    acc_id :{ type: Schema.Types.ObjectId, ref: 'accId' ,required: true },
    restaurants: { type: Schema.Types.ObjectId, ref: 'restaurant' ,required: true }

}, { timestamps: true });

// SalesSchema.virtual('id').get(function () {
//     return this._id.toHexString();
// });

// SalesSchema.set('toJSON', {
//     virtuals: true,
// });

module.exports = mongoose.model('Sales', SalesSchema);