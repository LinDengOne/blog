module.exports = app => {
    const express = require('express')
    const router = express.Router()

    let Article = require('../../models/article')
    let Comment = require('../../models/comment')

    let RequestResult = require('../../plugins/requestResult')
    let DateFormat = require('../../plugins/dateFormat')

    //文章列表
    router.get('/article', async (req, res) => {
        //console.log(req.query.page)
        const page = req.query.page || 1
        const result = await Promise.all([
            Article.countDocuments(),
            Article.find().sort({time:-1}).limit(Number(10)).skip(Number(10)*(page-1))
        ])

        result[1].forEach(item => item._doc['time'] = DateFormat(item.time))
        //转换时间格式
        /* if (req.query.from) {

        } */
        //文章列表分类
        if (req.query.from) {
            result[1] = result[1].reduce((total, item)=>{
                const [ , year, date] = /(\d+)\/(\d+)/.exec(item.time.date)
                total['_'+year] = total['_'+year] || {}
                total['_'+year][date] = total['_'+year][date] || []
                total['_'+year][date].push(item)
                return total
            }, {})
        }
        const data = {
            data: result[1],
            page: Number(page),
            totalPage: Math.ceil(result[0]/10)
        }

        res.send(RequestResult(1, data))
    })

    //查看文章
    router.get('/article/:id', async (req, res) => {
        const id = req.params.id
        const data = await Article.findOneAndUpdate({
            _id: id
        }, {
            $inc: { 'read': 1 }
        }, {
            new: true //查找更新后的数据
        })
        if(data) {
            data._doc['time'] = DateFormat(data.time)
            res.send(RequestResult(1, data))
        } else {
            res.send(RequestResult())
        }
    })

    //发表评论
    router.post('/comment', async (req, res) => {
        const result = await Comment.create(req.body.data)
        if(result.type === 1) {
            result._doc['child'] = [];
        }
        result._doc['time'] = DateFormat(result.time)
        res.send(RequestResult(1,result))
    })


    app.use('/web/api', router)
}