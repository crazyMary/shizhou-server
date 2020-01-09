const jwt = require('jwt-simple')
const { jwt: jwtconf } = require('../module/conf')
const httpcode = {
  S: 200,
  E: 500
}
exports.__DEV__ = process.env.NODE_ENV === 'dev'
exports.__TEST__ = process.env.NODE_ENV === 'test'
exports.__PRD__ = process.env.NODE_ENV === 'production'
exports.httpcode = httpcode
exports.initReply = () => ({ code: httpcode.E, message: '', data: null })
exports.decodeToken = ctx => {
  const rawtoken = ctx.request.header.authorization.split(' ')[1]
  if (rawtoken !== 'null') {
    return jwt.decode(
      ctx.request.header.authorization.split(' ')[1],
      jwtconf.secret
    )
  }
  return null
}
