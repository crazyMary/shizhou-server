const router = require('koa-router')()
const DB = require('../../module/db')
const CLN = 'article'

router.post('/add', async ctx => {
  await DB.insert(CLN, ctx.request.body)
  ctx.body = {}
})

router.get('/list', async ctx => {
  const res = await DB.find(CLN, {}, { sort: { createAt: -1 } })
  ctx.body = res
})

module.exports = router.routes()
