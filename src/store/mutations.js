import * as types from './mutation-types'

// define state mutations
const mutations = {
  [types.SET_SINGER](state, singer) { // computed property
    state.singer = singer
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_PLAY_LIST](state, playList) {
    state.playList = playList
  },
  [types.SET_SEQUENCE_LIST](state, seqList) {
    state.sequenceList = seqList
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }
}

export default mutations
