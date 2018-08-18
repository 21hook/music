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

  // no CORS in server side
  console.log(req.body)
  axios.post(url, req.body,
    // forge request headers
    {
      host: 'ustbhuangyi.com',
      referer: 'http://ustbhuangyi.com/music/'
    })
    .then(response => res.json(response.data))
    .catch(err => console.error(err))
})

module.exports = apiRoutes
