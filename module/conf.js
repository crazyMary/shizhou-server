const { __PRD__ } = require('./shared')
const path = require('path')

module.exports = {
  db: {
    url: 'mongodb://122.51.11.77:27017/',
    name: __PRD__ ? 'sz' : 'sz-test'
  },
  cors: {
    origin: ctx => ctx.header.origin
  },
  jwt: {
    secret: 'mooncake',
    exp: 1000 * 60 * 60 * 24 * 7,
    refExp: 1000 * 60 * 60 * 24 * 30
  },
  UPLOAD_DIR: path.resolve(__dirname, '../upload')
}
