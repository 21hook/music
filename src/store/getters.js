export const singer = state => state.singer

export const disc = state => state.disc

export const topList = state => state.topList

export const playList = state => state.playList

// getter for the current song
export const currentSong = state => state.playList[state.currentIndex] || {}

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex
