const express = require('express')                  //backend framework
const mongoose = require('mongoose')                //to interact with mongodb
//const bodyParser = require('body-parser')           //take request to get data from the UI
const path = require('path')
//const config = require('config')

//routing files
const images = require('./routes/images')

const app = express();

const cors = require('cors')

app.use(cors())

//bodyparse middleware
app.use(express.json())

//db config 
//const db = config.get('mongoURI')

//connect to mongodb using mongoose
mongoose.connect('mongodb://127.0.0.1:27017/Artsy', { useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    console.log(err || 'MongoDB is now Connected')
})

//Use routes
app.use('/image', images)


//deployment
//serve static assest
// if (process.env.NODE_ENV === 'production'){
//     //set a static folder
//     app.use(express.static('client/build'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }


//start server
const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})