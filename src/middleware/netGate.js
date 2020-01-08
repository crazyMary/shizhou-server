const { httpcode } = require('../module/shared')

module.exports = async (ctx, next) => {
  await next()
  const { code = httpcode.S, message = '', data } = ctx.body
  ctx.body = {
    code,
    data: code === httpcode.S ? ctx.body : data,
    message
  }
}
