export default {
  namespaced: true,

  state: {
    currentUser: null
  },

  getters: {
    isLoggedIn(state) {
      return state.currentUser != null && state.currentUser.id != null
    }
  },

  mutations: {
    setCurrentUser(state, credentials) {
      state.currentUser = { id: credentials.id, email: credentials.email }
    },
    clearCurrentUser(state) {
      state.currentUser = null
    }
  },

  actions: {
    async login({ commit }, credentials) {
      console.log("Loggin in", credentials)
      try {
        if(credentials.email == "error@error.com") throw new Error("Invalid credentials")
        commit('setCurrentUser', { id: '92883883', email: 'guest@guest.com' })
      } catch(err) {
        throw new Error(err)
      }
    },
    logout({ commit }) {
      commit('clearCurrentUser')
    }
  }

}