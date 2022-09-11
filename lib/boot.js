const fs = require('fs')
const path = require('path')
const express = require('express')

module.exports = function (app) {
  const dir = path.join(__dirname, '../routes')
  fs.readdirSync(dir).forEach(filename => {
    const filepath = path.join(dir, filename)
    const module = require(filepath)
    const router = express.Router()
    const { middlewares } = module
    for (const key in module) {
      if (key === 'middlewares') continue
      const { method, handlers } = module[key]
      router[method](`/${key}`, ...handlers)
    }
    if (middlewares) {
      app.use(`/api/${filename.split('.')[0]}`, ...middlewares, router)
    } else {
      app.use(`/api/${filename.split('.')[0]}`, router)
    }
  })
}
