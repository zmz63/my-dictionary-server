const mongoose = require('mongoose')

const uri = 'mongodb://localhost/dictionary'

mongoose.connect(uri, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})

module.exports = {
  Word: require('./word')
}
