module.exports = app => {
    const express = require('express');
    const router = express.Router();

    let Article = require('../../models/article');
    
    let RequestResult = require('../../plugins/requestResult')
    let GetPage = require('../../plugins/getPage')
    //获取文章列表
    router.get('/article',async(req, res) => {
        const data = await GetPage(Article, req.query.page, req.query.count)
        res.send(RequestResult(1, data))
    })

    //获取指定id文章 
    router.get('/article/:id', (req, res) => {
        Article.findOne({_id: req.params.id}, (err,doc) => {
            res.send(RequestResult(err, doc))
        })
    })

    //新建文章
    router.post('/article', async (req, res) => {
        const result = await Article.create(req.body.data)
        res.send(RequestResult(1, result))

    })

    //更新文章
    router.post('/article/:id', (req, res) => {
        Article.findByIdAndUpdate(
            req.params.id,
            req.body.data,
            (err, doc) => {
                res.send(RequestResult(err, doc))
            }
        )
    })

    //删除文章
    router.delete('/article/:id', (req, res) => {
        Article.findByIdAndDelete(req.params.id, (err, doc) => {
            res.send(RequestResult(err, doc))
        })
    })

    app.use('/admin/api',router)
}