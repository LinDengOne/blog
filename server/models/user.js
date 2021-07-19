const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: String,
    password: String,
    code: String,
    name: String,
    avatar: String,
    birth: String
})

module.exports = mongoose.model('user', schema)