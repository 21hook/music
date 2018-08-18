import * as types from './mutation-types'

// define state mutations
const mutations = {
  [types.SET_SINGER](state, singer) { // computed property
    state.singer = singer
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  }
}

export default mutations
