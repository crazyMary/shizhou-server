const sign = require('jwt-simple')
const { jwt: jwtconf } = require('./conf')
const httpcode = {
  S: 200,
  E: 500
}
exports.__DEV__ = process.env.NODE_ENV === 'dev'
exports.__TEST__ = process.env.NODE_ENV === 'test'
exports.__PRD__ = process.env.NODE_ENV === 'production'
exports.httpcode = httpcode
exports.initReply = () => ({ code: httpcode.E, message: '', data: null })
exports.authSign = info => {
  const { exp, refExp, secret } = jwtconf
  function payload(info, exp) {
    return {
      exp: Date.now() + exp,
      uid: info._id,
      role: info.role
    }
  }
  return {
    token: sign.encode(payload(info, exp), secret),
    refreshToken: sign.encode(payload(info, refExp), secret)
  }
}
exports.serverHost = function() {
  const ENV = process.env.NODE_ENV
  switch (ENV) {
    case 'dev':
      return '//localhost:3333'
    case 'test':
      return '//122.51.11.77:3333'
    case 'production':
      return '//122.51.11.77:3334'
  }
}
