import * as types from './mutation-types'

// define state mutations
const mutations = {
  [types.SET_SINGER](state, singer) { // computed property
    state.singer = singer
  }
}

export default mutations
