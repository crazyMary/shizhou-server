const router = require('koa-router')()

router.get('/login', ctx => {
  ctx.body = 'logining'
})
module.exports = router.routes()
