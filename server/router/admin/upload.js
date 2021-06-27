module.exports = app => {
    const express = require('express')
    const router = express.Router()

    let RequestResult = require('../../plugins/requestResult')

    const multer = require('multer')

    /** 
     *设置文件路径，名字，获取后缀
     */
    const storage = multer.diskStorage({
        destination: (req, file,cb) => {
            //const name = file.mim
            cb(null,`./uploads`)
        },
        filename: (req, file, cb) => {
            const temp = (file.originalname).split(".");
            //const name = Date.now() + '.' + temp.pop();
            cb(null, Date.now() + '.' + temp.pop())
        }
    })

    const upload = multer({ storage: storage })


    //上传文件
    router.post('/upload', upload.single('file'), async (req , res, next) => {
        const filePath = (req.file.path).replace(/\\/g,"\/")
        const data = {
            url: `http://localhost:3000/${filePath}`,
            message: '上传成功'
        }
        res.send(RequestResult(1, data))
    })

    app.use('/admin/api', router)
}