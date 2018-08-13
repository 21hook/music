import originJsonp from 'jsonp'

/**
 * Send a Jsonp request.
 *
 * @param url request url
 * @param data request body
 * @param {Promise<any>} a Jsonp promise
 */
export default function (url, data, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data) // resolve data
      } else {
        reject(data) // reject err
      }
    })
  })
}

// private methods
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
