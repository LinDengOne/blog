module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:127.0.0.1:27017/blog',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
    })
    mongoose.connection.once("open", function(){
        console.log('mongoose success ~ ~')
    })
}   