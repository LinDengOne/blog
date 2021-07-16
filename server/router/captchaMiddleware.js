module.exports = options => {
    captchaHandler = async (req,res,next) => {
        if (req.url !== '/captcha') {
            await next()
            return
          }
          if (!req.session.records) {
            req.session.records = []
          }
          const now = Date.now()
          req.session.records.push(now)
          // 如果在一小段时间中请求达到了一定的数量，就可能是机器
          const duration = 10000;
          const repeat = 3;
          req.session.records = req.session.records.filter(time => now - time < duration) // 如果10s内请求大于3次
          if (req.session.records.length >= repeat || 'captcha' in req.body) { // 就要出现验证码
            validateCaptcha(req,res,next)
          } else {
            await next()
          }
    }
    async function validateCaptcha (req,res,next) {
        const reqCaptcha = req.body.captcha ? req.body.captcha.toLocaleLowerCase() : '' // 如果用户传了验证码
        if (reqCaptcha !== req.session.captcha) { // 验证码不对
          res.status = 401
          // res.body = getErr('验证码有问题', 401)
          await next()
        } else {
          await next()
        }
      }
}
