const router = require('koa-router')()

router.get('/login', ctx => {
  ctx.body = 'login'
})
module.exports = router.routes()
