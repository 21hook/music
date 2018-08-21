import {playMode} from 'common/config'

const state = {
  // singer public state
  singer: {},
  // disc public state
  disc: {},
  // top list public state
  topList: {},
  // player public state
  playing: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

export default state
