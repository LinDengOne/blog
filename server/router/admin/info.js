module.exports = app => {
    const express = require('express')
    const router = express.Router()

    let Article = require('../../models/article');
    let Comment = require('../../models/comment');
    let User = require('../../models/user');
    // let info = require('../../models/info')

    let RequestResult = require('../../plugins/requestResult')
    let DateFormat = require('../../plugins/dateFormat') 
    
    router.get('/info',(req,res) => {
        Promise.all([
            User.findOne(),
            Article.findOne().sort({time:-1}),
            Article.countDocuments(),
            Comment.countDocuments(),
            Comment.find({status: 1}).countDocuments()
        ]).then(result => {
            const key = [
                
                'admin',
                'article',
                'articleQty',
                'commentQty',
                'unread'
            ]
            const data = key.reduce((total, item, index) => {
                total[item] = result[index]
                console.log(item);
                console.log(result[index]);
                return total
            },{})
            res.send(RequestResult(null, data))
        })
    })

    router.post('/info', (req, res) => {
        User.findOneAndUpdate({
            _id: req.body._id
        },{
            $set:{
                name: req.body.name,
                avatar: req.body.avatar,
                birth: req.body.birth
            }
        }, (err, doc) => {
                res.send(RequestResult(1, '上传成功'))
        })
    })
app.use('/admin/api', router)
}