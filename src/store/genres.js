import Axios from 'axios'
import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    genres: []
  },

  getters: {
    genres(state) {
      return state.genres
    }
  },

  mutations: {
    setAll(state, genres) {
      state.genres = genres
    },
    add(state, genre) {
      state.genres.push(genre)
    },
    remove(state, id) {
      const index = state.genres.findIndex(g => g._id === id) 
      state.genres.splice(index, 1)
    },
    update(state, genre) {
      const index = state.genres.findIndex(g => g._id === genre._id)
      Vue.set(state.genres, index, genre)
    }
  },

  actions: {
    async fetchAll({ commit }) {
      try {
        const response = await Axios.get('/api/genres')
        commit('setAll', response.data.genres)
      } catch(err) {
        console.log(err)
      }
    },
    fetchGenre({ getters }, id) {
      try{ 
        return getters.genres.find(g => g._id === id)
      } catch(err) {
        throw err
      }
    },
    async deleteGenres( { commit }, ids) {
      try {
        ids.forEach(async (id) => {
          await Axios.delete('/api/genres/'+id)
          commit('remove', id)
        })
      } catch(err) {
        throw err
      }
    },
    async submit({ commit, rootGetters }, payload) {
      const userId = rootGetters['auth/userId']
      try {
        if(payload.id) {
          const response = await Axios.put('/api/genres/' + payload.id, { name: payload.name, user: userId })
          commit('update', response.data.genre)
        } else {
          const response = await Axios.post('/api/genres', { name: payload.name, user: userId })
          commit('add', response.data.genre)
        }
      } catch(err) {
        throw err
      }
    }
  }

}