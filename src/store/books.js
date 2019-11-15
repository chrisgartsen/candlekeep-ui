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
    },
    removeBook(state, id) {
      const index = state.books.findIndex(book => book._id === id)
      state.books.splice(index, 1)
    }
  },

  actions: {
    async createBook({commit}, payload) {
      const book = {
        isbn: payload.isbn,
        title: payload.title,
        author: payload.author,
        publisher: payload.publisher,
        genre: payload.genre,
        language: payload.language,
        publishedDate: payload.publishedDate,
        description: payload.description,
        thumbnail: payload.thumbnail
      }
      try {
        const response = await Axios.post('/api/books', book)
        commit('addBook', response.data.book)
      } catch (err) {
        throw err
      }
    },
    async deleteBook({commit}, id) {
      try {
        await Axios.delete('/api/books/' + id)
        commit('removeBook', id)
      } catch(err) {
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