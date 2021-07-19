module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const User = require('../../models/user')

    const Captcha = require('svg-captcha')
    const crypto = require('crypto');
    const jwt = require('jsonwebtoken');
    let RequestResult = require('../../plugins/requestResult')

    router.use('/captcha', async (req,res,next) => {
        if (req.url !== '/captcha') {
            await next()
            return
          }
          if (!req.session['records']) {
            req.session['records'] = []
          }
          const now = Date.now()
          req.session['records'].push(now)
          // 如果在一小段时间中请求达到了一定的数量，就可能是机器
          const duration = 10000;
          const repeat = 3;
          req.session['records'] = req.session['records'].filter(time => now - time < duration) // 如果10s内请求大于3次
          if (req.session['records'].length >= repeat || 'captcha' in req.body) { // 就要出现验证码
            const reqCaptcha = req.body.captcha ? req.body.captcha.toLocaleLowerCase() : '' // 如果用户传了验证码
            if (reqCaptcha !== req.session['captcha']) { // 验证码不对
              res.status = 401
            }
          } else {
            await next()
          }
    })
    router.get('/captcha',(req,res) => {
        const cap = Captcha.createMathExpr({
            width: 100,
            height: 50,
            ignoreChars: '0oO1ilI', // 排除 0oO1ilI
            noise: 2, // 干扰线条数量
            color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
          })
        res.type('svg'); // 响应的类型
        req.session['captcha'] = cap.text; // session 存储
        console.log(req.session['captcha']);
        res.send(cap.data);
        })
    //注册
    router.post('/register', async (req, res) => {
        console.log(req.body.captcha);
        console.log(req.session['captcha']);
        if(req.body.captcha != req.session['captcha']){
            res.send(RequestResult('验证码不正确！'))
            return
        }
        const len = await User.find().countDocuments()
        const pwd = crypto.createHash('sha256').update(req.body.password).digest('hex');
        const user = {
            username: req.body.username,
            password: pwd
        }
        const info = {
            base: { 
                email_pass: req.body.pass,
                email_type: req.body.email_type
            },
            administrator: { email: req.body.email }
        }
        if (len) {
            res.send(RequestResult('请勿重复注册账号，如忘记密码请点击找回密码！'))
        } else {
            // 创建账号
            User.create(user, (err, docs) => {
                if (docs.length != 0) {
                    res.send(RequestResult(1, { message: '注册成功' }))
                } else {
                    res.send(RequestResult('注册失败，服务器或数据库出错！'))
                }
            })
        }
    })
     // 登录
     router.post('/login', async (req, res) => {
        if (Object.keys(req.body).length != 2) {
            res.send(RequestResult('请填写完整的信息！'))
            return
        }
        const password = crypto.createHash('sha256').update(req.body.password).digest('hex');
        const info = {
            username: req.body.username,
            password
        }
        User.find(info, (err, docs) => {
            if (docs.length != 0) {
                const token = jwt.sign(info, 'LinDengOne', {
                    expiresIn: 60 * 60 * 24
                })
                res.send(RequestResult(1, {
                    message: '登录成功',
                    info: docs[0],
                    token
                }))
            } else {
                res.send(RequestResult('用户名或密码错误！'))
            }
        })
    })
    app.use('/admin/api', router)
}

