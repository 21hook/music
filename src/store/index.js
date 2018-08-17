import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex) // install the Vue plugin

const debug = process.env.NODE_ENV !== 'production' // start vuex debug tool

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  state,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
