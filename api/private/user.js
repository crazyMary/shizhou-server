const router = require('koa-router')()
const DB = require('../../module/db')
const CLN = 'user'

router.post('/add', async ctx => {
  await DB.insert(CLN, ctx.request.body)
  ctx.body = ctx.request.body
})

module.exports = router.routes()
