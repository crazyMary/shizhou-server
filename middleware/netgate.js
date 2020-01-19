const { httpcode } = require('../module/shared')

module.exports = async (ctx, next) => {
  const curUrl = ctx.request.url
  if (!curUrl.match(/\api\/public/)) {
    const payload = ctx.state.user
    if (payload && payload.exp < Date.now()) {
      ctx.status = 403
      return (ctx.body = 'token失效')
    }
  }
  await next()
  const { code = httpcode.S, message = '', data } = ctx.body
  ctx.body = {
    code,
    data: code === httpcode.S ? ctx.body : data,
    message
  }
}
