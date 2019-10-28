import Axios from 'axios'
import { LocalStorage } from 'quasar'

export default {
  namespaced: true,

  state: {
    token: null,
    userId: null
  },

  getters: {
    isLoggedIn(state) {
      return state.token != null && state.userId != null
    },
    token(state) {
      return state.token
    },
    userId(state) {
      return state.userId
    }
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    clearCredentials(state) {
      state.token = null
      state.userId = null
    }
  },

  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await Axios.post('/auth/login', { email: credentials.email, password: credentials.password })
        commit('setToken', response.data.token)
        commit('setUserId', response.data.id)
        LocalStorage.set('userId', response.data.id)
        LocalStorage.set('webToken', response.data.token)
      } catch(err) {
        throw new Error(err.response.data.error)
      }
    },
    logout({ commit }) {
      commit('clearCredentials')
      LocalStorage.clear()
    },
    autoLogin({commit}, credentials) {
      commit('setToken', credentials.token)
      commit('setUserId', credentials.userId)
    }
  }

}