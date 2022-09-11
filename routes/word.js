const apicache = require('apicache')
const { getSuggestResult, getSearchResult } = require('../controllers/word')

exports.middlewares = [apicache.middleware('1 day')]

exports.suggest = {
  method: 'get',
  handlers: [getSuggestResult]
}

exports.search = {
  method: 'get',
  handlers: [getSearchResult]
}
