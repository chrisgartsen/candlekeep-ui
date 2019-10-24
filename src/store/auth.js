import Axios from 'axios'
import { LocalStorage } from 'quasar'

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
    },
    currentUser(state) {
      return state.currentUser
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
        const response = await Axios.post('/auth/login', { email: credentials.email, password: credentials.password })
        commit('setCurrentUser', { id: response.data.id, email: credentials.email, token: response.data.token })
        LocalStorage.set('userId', response.data.id)
        LocalStorage.set('webToken', response.data.token)
      } catch(err) {
        throw new Error(err.response.data.error)
      }
    },
    logout({ commit }) {
      commit('clearCurrentUser')
      LocalStorage.clear()
    }
  }

}