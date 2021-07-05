module.exports = app => {
    const express = require('express')
    const router = express.Router()

    let Article = require('../../models/article')
    let RequestResult = require('../../plugins/requestResult')
    let DateFormat = require('../../plugins/dateFormat')

    router.get('/article', async (req, res) => {
        //console.log(req.query.page)
        const page = req.query.page || 1
        const result = await Promise.all([
            Article.countDocuments(),
            Article.find().sort({time:-1}).limit(Number(10)).skip(Number(10)*(page-1))
        ])

        result[1].forEach(item => item._doc['time'] = DateFormat(item.time))
        /* if (req.query.from) {

        } */
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





    app.use('/web/api', router)
}