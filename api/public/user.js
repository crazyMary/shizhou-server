const router = require('koa-router')()
const DB = require('../../module/db')
const CLN = 'user'
const sign = require('jwt-simple')
const { jwt: jwtconf } = require('../../module/conf')
const { httpcode, initReply, authSign } = require('../../module/shared')

router.post('/login', async ctx => {
  const { username = '', password = '' } = ctx.request.body
  const result = await DB.findOne(CLN, { username })
  let reply = initReply()
  if (result) {
    if (password === result.password) {
      const { token, refreshToken } = authSign(result)
      result.token = token
      result.refreshToken = refreshToken
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

router.get('/refreshToken', async ctx => {
  const info = sign.decode(ctx.request.query.refreshToken, jwtconf.secret)
  if (info.exp < Date.now()) {
    ctx.status = 403
    return (ctx.body = 'token失效')
  }
  ctx.body = authSign(info)
})

module.exports = router.routes()
