const router = require('koa-router')()
router.prefix('/api/public')

router.use('/user', require('./user'))
module.exports = router
