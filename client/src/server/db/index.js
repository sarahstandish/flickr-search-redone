require('dotenv').config()

const mongoose = require('mongoose');

const connectionsString = process.env.REACT_APP_MONGO_CONNECTIONS_STRING
console.log("Connections string is: ", connectionsString)

mongoose
    // .connect(process.env.MONGODB_URI || connectionsString, {
    .connect(connectionsString, {
        dbName: 'myFirstDatabase',
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db;