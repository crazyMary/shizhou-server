const path = require('path')
const fse = require('fs-extra')
const multiparty = require('multiparty')
const { initReply, __DEV__, __TEST__, __PRD__ } = require('../../module/shared')
const router = require('koa-router')()
const conf = require('../../module/conf')
const DB = require('../../module/db')
const CLN = 'img'

router.post('/upload', async ctx => {
  let reply = initReply()
  function upload(ctx) {
    let filename = ''
    return new Promise(function(resolve, reject) {
      const form = new multiparty.Form()
      form.parse(ctx.req, function(err, fields, files) {
        if (err) return reject(err)
        const file = files.file[0]
        filename = `/${Date.now()}_${file.originalFilename}`
        resolve(file)
      })
    })
      .then(file => fse.move(file.path, conf.UPLOAD_DIR + filename))
      .then(() => (reply = { path: filename }))
      .catch(e => (reply.message = '上传错误'))
  }
  await upload(ctx)
  ctx.body = reply
})

module.exports = router.routes()
