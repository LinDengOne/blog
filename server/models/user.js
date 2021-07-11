const mongoose = requiere('mongoose')

const schema = new mongoose.Schema({
    username: String,
    password: String,
    code: String
})

module.exports = mongoose.model('user', schema)