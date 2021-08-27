const connectionsString = require('../lib/credentials')
const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URI || connectionsString, {
        dbName: 'myFirstDatabase',
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db;