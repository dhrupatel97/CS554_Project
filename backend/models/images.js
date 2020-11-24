const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create schema
const ImageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = Image = mongoose
.model('image', ImageSchema)