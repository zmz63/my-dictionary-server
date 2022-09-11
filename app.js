const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
  })
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

require('./lib/boot')(app)

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500).end()
})

app.listen(4000)
