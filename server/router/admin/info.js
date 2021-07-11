module.exports = app => {
    const express = require('express')
    const router = express.Router()

    let Article = require('../../models/article');
    let Comment = require('../../models/comment');

    let RequestResult = require('../../plugins/requestResult')
    let DateFormat = require('../../plugins/dateFormat') 
    
    router.get('/info',(req,res) => {
        Promise.all([
            Article.findOne().sort({time:-1}),
            Article.countDocuments(),
            Comment.countDocuments(),
            Comment.find({status: 1}).countDocuments()
        ]).then(result => {
            const key = [
                //'info',
                'article',
                'articleQty',
                'commentQty',
                'unread'
            ]
            const data = key.reduce((total, item, index) => {
                total[item] = result[index]
                return total
            },{})
            res.send(RequestResult(null, data))
        })
    })
app.use('/admin/api', router)
}