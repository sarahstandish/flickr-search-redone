const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)

// define data model as JSON key/value pairs
// value indicates the data type of each key

const flickrSearchCallSchema = new Schema({
    // dateTime: { type: Number, required: true },
    // calls: { type: Number, required: true }
    dateTime: Number,
    calls: Number
})

const flickrSearchCall = mongoose.model('flickrSearchCall', flickrSearchCallSchema)

module.exports = flickrSearchCall;