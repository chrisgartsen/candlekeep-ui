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
      return new Promise((resolve, reject) => {
        try {
          state.books.push(book)
          resolve()
        } catch(err) {
          reject(err)
        }
      })
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