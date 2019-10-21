export default {
  namespaced: true,

  state: {
    showDrawer: true
  },

  getters: {
    showDrawer(state) {
      return state.showDrawer
    }
  },

  mutations: {
    setDrawer(state, visible) {
      state.showDrawer = visible
    }
  },

  actions: {
    toggleDrawer({ commit , state }, visible ) {
      commit('setDrawer', !state.showDrawer)
    }
  }
}