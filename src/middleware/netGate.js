const { httpcode, decodeToken } = require('../module/shared')

module.exports = async (ctx, next) => {
  try {
    if (!ctx.request.url.match(/login$/)) {
      const payload = decodeToken(ctx)
      if (payload && payload.exp < Date.now()) {
        const e = new Error('token失效')
        e.status = 403
        throw e
      }
    }
    await next()
    const { code = httpcode.S, message = '', data } = ctx.body
    ctx.body = {
      code,
      data: code === httpcode.S ? ctx.body : data,
      message
    }
  } catch (e) {
    const status = e.status
    if (status) {
      switch (status) {
        case 401:
          ctx.status = status
          ctx.body = '用户未登录'
          break
        case 403:
          ctx.status = status
          ctx.body = 'token失效'
          break
        default:
          break
      }
    }
  }
}
