import axios from 'axios'
import jsonp from 'common/jsonp'
import {commonParams, options} from './config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options) // return a jsonp promise
}

export function getDiscList() {
  const url = '/api/getDiscList'

  const params = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params
  }).then(res => Promise.resolve(res.data)) // .then(res_data_resolved => //...)
}

export function getSongList(disstid) { // 获取歌曲列表（由推荐页热门歌单列表点击进去的歌曲数据）
  const url = '/api/songList' // url to the server agent

  const params = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios.get(url, {params}) // resolve or reject json response
}
