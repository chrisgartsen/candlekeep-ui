import Axios from 'axios'

export default {
  namespaced: true,

  state: {
    publishers: []
  },

  getters: {
    publishers(state) {
      return state.publishers
    }
  },

  mutations: {
    setAll(state, publishers) {
      state.publishers = publishers
    },
    add(state, publisher) {
      state.publishers.push = publisher
    }
  },

  actions: {
    async fetchAll({ commit }) {
      try {
        const response = await Axios.get('/api/publishers')
        commit('setAll', response.data.publishers)
      } catch(err) {
        console.log(err)
      }
    },
    async submit({ commit, rootGetters }, payload) {
      const userId = rootGetters['auth/userId']
      try {
        const response = await Axios.post('/api/publishers', {
          name: payload.name,
          user: userId
        })
        commit('add', response.data.publisher)
      } catch(err) {
        console.log(err)
        throw err
      }
      console.log("Submitting", payload)
    }
  }
}