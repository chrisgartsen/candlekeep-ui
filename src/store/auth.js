export default {
  namespaced: true,

  state: {
    currentUser: null
  },

  getters: {

  },

  mutations: {
    setCurrentUser(state, credentials) {
      state.currentUser = { id: credentials.id, email: credentials.email }
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
    }
  }

}