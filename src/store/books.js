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
      state.books.push(book)
    },
    setBooks(state, books) {
      state.books = books
    }
  },

  actions: {
    async addBook({commit}, payload) {
      const book = {
        isbn: payload.isbn,
        title: payload.title
      }
      try {
        const response = await Axios.post('/api/books', book)
        commit('addBook', response.data.book)
      } catch (err) {
        throw err
      }
    },
    async fetchBooks({commit}) {
      try {
        const response = await Axios.get('/api/books')
        commit('setBooks', response.data.books)
      } catch(err) {
        throw err
      }
    }
  }
}