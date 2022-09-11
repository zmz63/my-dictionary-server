const http = require('http')
const https = require('https')
const axios = require('axios')

const axiosInst = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0'
  },
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  timeout: 3000
})

axiosInst.interceptors.request.use(
  config => {
    if (config.method.toUpperCase() === 'POST') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if (config.url.includes('dict.youdao.com')) {
      config.headers['Origin'] = 'https://www.youdao.com'
      config.headers['Referer'] = 'https://www.youdao.com/'
    }

    return config
  },
  error => Promise.reject(error)
)

axiosInst.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

module.exports = axiosInst
