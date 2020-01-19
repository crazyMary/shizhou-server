const router = require('koa-router')()
router.prefix('/api/private')

router.use('/user', require('./user'))
router.use('/img', require('./img'))
module.exports = router
