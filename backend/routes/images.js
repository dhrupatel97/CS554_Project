const express = require('express')
const app = express()

const Image = require('../models/images')

app.get('/', (req, res) => {
    Image.find().sort({date: -1}).then(img => res.json(img))
})

app.post('/add', (req, res) => {
    const newImg = new Image({
        name: req.body.name,
        category: req.body.category,
        likes: [],
        comments: []
    })

    newImg.save().then(img => res.json(img))
})
module.exports = app