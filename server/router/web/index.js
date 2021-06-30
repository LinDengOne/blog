module.exports = app => {
    const express = require('express')
    const router = express.Router()

    let Article = require('../../models/article')
    let RequestResult = require('../../plugins/requestResult')
    router.get('/article', async (req, res) => {
        //console.log(req.query.page)
        const page = req.query.page || 1
        const result = await Promise.all([
            Article.countDocuments(),
            Article.find().sort({like:-1}).limit(Number(10)).skip(Number(10)*(page-1))
        ])


        /* if (req.query.from) {

        } */
        const data = {
            data: result[1],
            page: Number(page),
            totalPage: Math.ceil(result[0]/10)
        }

        res.send(RequestResult(1, data))
    })





    app.use('/web/api', router)
}