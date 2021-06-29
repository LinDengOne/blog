const express = require('express')
app = express()
app.use(require('cors')())
app.use(express.json())
const path = require('path')
app.use(express.urlencoded({ extended: false }))

//静态资源
app.use('/uploads', express.static(__dirname + '/uploads'))

//路由
require('./plugins/db')(app)
require('./router/admin/article')(app)
require('./router/admin/upload')(app)
require('./router/web/index')(app)
app.listen(3000, () => {
    console.log('http://loclhost:3000');
})