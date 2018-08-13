import {getRecommend} from '@/api/recommend'

describe('recommend api', () => {
  it('fetch recommends correctly', done => {
    return getRecommend()
      .then(res => { // resolved value in the jsonp promise
        console.log(res)
      })
      .catch(err => { // rejected value in the jsonp promise
        expect(err).toBeDefined()
      })
  })
})
