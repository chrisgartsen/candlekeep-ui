import Axios from  'axios'
import Vue from 'vue'

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
    remove(state, id) {
      const index = state.authors.findIndex(author => author._id === id)
      state.authors.splice(index, 1)
    },  
    setAll(state, authors) {
      state.authors = authors
    },
    update(state, author) {
      const index = state.authors.findIndex(a => a._id === author._id)
      Vue.set(state.authors, index, author)
    }
  },

  actions: {
    findAuthor({ getters }, name) {
      try {
        return getters.authors.find(a => a.name === name)
      } catch(err) {
        console.log(err)
      }
    },
    fetchAuthor({ getters }, id) {
      try {
        return getters.authors.find(a => a._id === id)
      } catch(err) {
        console.log(err)
      }
    },
    async fetchAll({ commit }) {
      try {
        const response = await Axios.get('/api/authors')
        commit('setAll', response.data.authors)
      } catch (err) {
        throw err
      }
    },
    async submit({ commit, rootGetters }, payload) {
      const userId = rootGetters['auth/userId']
      try {
        if(payload.id) {
          const response = await Axios.put('/api/authors/'+ payload.id, { name: payload.name, user: userId })
          commit('update', response.data.author)
        } else {
          const response = await Axios.post('/api/authors', { name: payload.name, user: userId })
          commit('add', response.data.author)
        }
      } catch (err) {
        throw err
      }
    },
    async delete({ commit }, id) {
      try {
        await Axios.delete('/api/authors/' + id)
        commit('remove', id)
      } catch(err) {
        throw err
      }
    },
    async deleteMultiple({commit}, ids) {
      try {
        ids.forEach(async (id) => {
          await Axios.delete('/api/authors/' + id)
          commit('remove',id)
        });
      } catch(err) {
        throw err
      }
    }
  }
}