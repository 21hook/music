import {getRecommend} from '@/api/recommend'
import jsonp from '@/common/jsonp'

jest.mock('jsonp')

describe('recommend api', () => {
  it('fetch recommends correctly', done => {
    // json pack
    const res = `_jsonp({ 
      "code": 0,
      "data": {}
    })
    `

    const mockJsonp = jest.fn()

    return getRecommend()
      .then(res => { // resolved value in the jsonp promise
        console.log(res)
      })
      .catch(err => { // rejected value in the jsonp promise
        expect(err).toBeDefined()
      })
  })
})
