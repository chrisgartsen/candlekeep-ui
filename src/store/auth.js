import Axios from 'axios'

export default {
  namespaced: true,

  state: {
    currentUser: null
  },

  getters: {
    isLoggedIn(state) {
      return state.currentUser != null && state.currentUser.id != null
    },
    webToken(state) {
      return state.currentUser ? state.currentUser.webToken : null
    }
  },

  mutations: {
    setCurrentUser(state, credentials) {
      state.currentUser = { id: credentials.id, email: credentials.email, webToken: credentials.token }
    },
    clearCurrentUser(state) {
      state.currentUser = null
    }
  },

  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await Axios.post('http://localhost:3000/auth/login', { email: credentials.email, password: credentials.password })
        console.log(response.data)
        commit('setCurrentUser', { id: response.data.id, email: credentials.email, token: response.data.token })
      } catch(err) {
        throw new Error(err.response.data.error)
      }
    },
    logout({ commit }) {
      commit('clearCurrentUser')
    }
  }

}