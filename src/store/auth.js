import Axios from 'axios'

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
      try {
        const response = await Axios.post('http://localhost:3000/auth/login', { email: credentials.email, password: credentials.password })
        console.log("Res", response.error)
        commit('setCurrentUser', { id: '92883883', email: 'guest@guest.com' })
      } catch(err) {
        throw new Error(err.response.data.error)
      }
    },
    logout({ commit }) {
      commit('clearCurrentUser')
    }
  }

}