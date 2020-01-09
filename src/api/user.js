const router = require('koa-router')()
const DB = require('../module/db')
const CLN = 'user'
const jwt = require('jwt-simple')
const { jwt: jwtconf } = require('../module/conf')
const { httpcode, initReply } = require('../module/shared')

router.post('/login', async ctx => {
  const { username = '', password = '' } = ctx.request.body
  const result = await DB.findOne(CLN, { username })
  let reply = initReply()
  if (result) {
    if (password === result.password) {
      let payload = {
        exp: Date.now() + jwtconf.exp,
        uid: result._id,
        role: result.role
      }
      result.token = jwt.encode(payload, jwtconf.secret)
      delete result.password
      reply = result
    } else {
      reply.message = '密码错误'
    }
  } else {
    reply.message = '用户不存在'
  }
  ctx.body = reply
})

router.post('/add', async ctx => {
  await DB.insert(CLN, ctx.request.body)
  ctx.body = ctx.request.body
})

module.exports = router.routes()
