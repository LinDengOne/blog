const express = require('express')
const expressJwt = require("express-jwt");
const session = require("express-session");
app = express()
app.use(require('cors')())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//静态资源
app.use('/uploads', express.static(__dirname + '/uploads'))

/**
 * 验证token
 * 跳过用户接口
 */
 const verifyToken = ['login', 'captcha', 'register'].map(i => '/admin/api/' + i)
 app.use(expressJwt({
     secret: "LinDengOne",
     algorithms:['HS256']
 }).unless({
     path: [ ...verifyToken ]
 }))
 
 // 接口验证
app.use((err, req, res, next) => {
    if (req.originalUrl.slice(1, 4) == 'web') { // 跳过前台
        return next()
    }
    if (err.name === "UnauthorizedError") {     // Token过期
        res.status(err.status || 401)
        res.send({
            message: 'token过期，请重新登录',
            code: 401,
            time: err.inner.expiredAt
        })
        return
    }
})

//session
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));


//路由
require('./plugins/db')(app)
require('./router/admin/article')(app)
require('./router/admin/upload')(app)
require('./router/admin/comment')(app)
require('./router/admin/info')(app)
require('./router/admin/introducing')(app)
require('./router/admin/login')(app)
require('./router/web/index')(app)

app.listen(3000, () => {
    console.log('http://loclhost:3000');
})