const { __DEV__ } = require('./shared')

module.exports = {
  db: {
    url: 'mongodb://122.51.11.77:27017/',
    name: __DEV__ ? 'sz-test' : 'sz'
  },
  cors: {
    origin: function(ctx) {
      if (__DEV__) {
        return ctx.header.origin
      }
    },
    methods: ['GET', 'POST', 'DELETE'],
    headers: ['Content-Type', 'Authorization']
  },
  jwt: {
    secret: 'mooncake',
    exp: 1000 * 60 * 60 * 24 * 7
  }
}
