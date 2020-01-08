exports.__DEV__ = process.env.NODE_ENV === 'dev'
const httpcode = {
  S: 200,
  E: 500
}
exports.httpcode = httpcode
exports.initReply = () => ({ code: httpcode.E, message: '', data: null })
