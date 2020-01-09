const { __DEV__, __TEST__, __PRD__ } = require('./shared')

module.exports = {
  db: {
    url: 'mongodb://122.51.11.77:27017/',
    name: __PRD__ ? 'sz' : 'sz-test'
  },
  cors: {
    origin: function(ctx) {
      return ctx.header.origin
      // if (__DEV__) {
      //   return ctx.header.origin
      // } else if (__TEST__) {
      //   return 'http://122.51.11.77:81'
      // } else {
      //   return 'http://122.51.11.77'
      // }
    }
  },
  jwt: {
    secret: 'mooncake',
    exp: 1000 * 60 * 60 * 24 * 7
  }
}
