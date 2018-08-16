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

module.exports = apiRoutes
