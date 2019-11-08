import Axios from 'axios' 

export default {
  namespaced: true,

  state: {
    books: []
  },

  getters: {
    books(state) {
      return state.books
    }
  },

  mutations: {
    addBook(state, book) {
      console.log("Adding book")
      state.books.push(book)
    }
  },

  actions: {
    addBook({commit}, payload) {
      const book = {
        isbn: payload.isbn,
        title: payload.title
      }
      commit('addBook', book)
    }
  }
}