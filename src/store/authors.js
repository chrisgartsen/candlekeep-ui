import Axios from  'axios'

export default {
  namespaced: true,

  state: {
    authors: []
  },

  getters: {
    authors(state) {
      return state.authors
    }
  },

  mutations: {
    add(state, author) {
      state.authors.push(author)
    },
    setAll(state, authors) {
      state.authors = authors
    }
  },

  actions: {
    async fetchAll({ commit }) {
      try {
        const response = await Axios.get('/api/authors')
        commit('setAll', response.data.authors)
      } catch (err) {
        throw err
      }
    },

    async create({ commit, rootGetters }, payload) {
      const userId = rootGetters['auth/userId']
      try {
        const response = await Axios.post('/api/authors', { name: payload.name, user: userId })
        commit('add', response.data)
      } catch (err) {
        throw err
      }
    }
  }

}