const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    date: String
})

module.exports = mongoose.model('view', schema)