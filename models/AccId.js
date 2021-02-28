const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccIdSchema = new Schema({
    username : {type: String , required: true},
    password : {type: String , required: true},
    isAdmin: {type: Boolean ,default: false}
},{ timestamps: true })

module.exports = mongoose.model('accId', AccIdSchema);