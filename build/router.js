// route/handler direct mapping
const express = require('express')
const axios = require('axios')
const apiRoutes = express.Router()

/*
  use the server as a proxy to request the real server for resources
  user proxy ----> server proxy ----> server
 */
apiRoutes.get('/getDiscList', (req, res) => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/songList', (req, res) => {
  // url to the server proxy 1
  const url = 'http://ustbhuangyi.com/music/api/getCdInfo'

  axios.get(url, {
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => console.error(err))
})

apiRoutes.post('/getPurlUrl', (req, res) => {
  const url = 'http://ustbhuangyi.com/music/api/getPurlUrl'

  // must config the request body paring firstly, otherwise got undefined !!
  // no CORS in server side
  axios.post(url, req.body,
    // forge request headers
    {
      host: 'ustbhuangyi.com',
      referer: 'http://ustbhuangyi.com/music/'
    })
    .then(response => res.json(response.data))
    .catch(err => console.error(err))
})

apiRoutes.get('/search', (req, res) => {
  // url to server proxy 1
  const url = 'http://ustbhuangyi.com/music/api/search'

  axios.get(url, {
    params: req.query
  }).then(response => {
    res.set('Content-Type', 'application/jsonp');
    res.send(response.data)
  }).catch(err => console.error(err))
})

apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data

    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

module.exports = apiRoutes
