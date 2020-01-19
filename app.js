const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')
const netgate = require('./middleware/netgate')
const static = require('koa-static')
const privateApi = require('./api/private')
const publicApi = require('./api/public')
const { cors: corsconf, jwt: jwtconf, UPLOAD_DIR } = require('./module/conf')

// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(cors(corsconf))
app.use(static(UPLOAD_DIR, { maxage: 1000 * 60 * 60 * 24 * 30 }))
app.use(
  koajwt({ secret: jwtconf.secret }).unless({
    path: [/\api\/public/]
  })
)
app.use(netgate)
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// api routes
app.use(privateApi.routes(), privateApi.allowedMethods())
app.use(publicApi.routes(), publicApi.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
