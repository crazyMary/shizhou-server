const router = require('koa-router')()
router.prefix('/api')

router.use('/user', require('./user'))
module.exports = router
