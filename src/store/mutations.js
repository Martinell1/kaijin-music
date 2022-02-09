const mutations = {
  setPlayState (state, playing) {
    state.playing = playing
  },

  setSequenceList (state, list) {
    state.sequence = list
  },

  setPlaylist (state, list) {
    state.playing = list
  },

  setPlayMode (state, mode) {
    state.playMode = mode
  },

  setCurrentIndex (state, index) {
    state.currentIndex = index
  },

  setFullScreen (state, fullScreen) {
    state.setFullScreen = fullScreen
  }
}

export default mutations
