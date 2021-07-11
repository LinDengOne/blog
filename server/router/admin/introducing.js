module.exports = app => {
    const express = require('express')
    const router = express.Router()
    
    let Introducing = require('../../models/introducing');
    let RequestResult = require('../../plugins/requestResult')
    
    router.post('/introducing',(req,res) => {
        if(req.body._id) {
            Introducing.findByIdAndUpdate(
                req.body.id,
                req.body,
                (err,doc) => {
                    res.send(RequestResult(err,doc))
                }
            )
        } else {
            Introducing.create(req.body,(err, doc) => {
                res.send(RequestResult(err, doc))
            })
        }
    })

    router.get('/introducing', (req, res) => {
        Introducing.findOne((err,doc) => {
            res.send(RequestResult(err, doc))
        })
    })

    app.use('/admin/api', router)
}