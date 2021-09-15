// https://medium.com/swlh/how-to-create-your-first-mern-mongodb-express-js-react-js-and-node-js-stack-7e8b20463e66

const express = require('express');
const cors = require('cors');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 8000;
const db = require('./client/src/server/db/index')
const callRouter = require('./client/src/server/routes/api-router')

app.use(express.urlencoded({extended:false})); // parse url-encoded strings
app.use(express.json())
app.use('/api', cors())

app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build'))
})

// .on is the event listener used for databases, 'open' is the event
db.on('open', () => {
        console.log('Mongoose connection open');
    })
    .on('error', console.error.bind(console, 'MongoDB connection error'))

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.use('/api', callRouter)

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));