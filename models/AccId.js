const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccIdSchema = new Schema({
    username : {type: String , required: true},
    password : {type: String , required: true},
    role: {type: String}
},{ timestamps: true })

module.exports = mongoose.model('accId', AccIdSchema);