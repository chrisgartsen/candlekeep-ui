import Axios from 'axios' 

const buildBook = (payload) => {
  return {
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
}

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
    async createBook({rootGetters}, payload) {
      const book = buildBook(payload)
      const userId = rootGetters['auth/userId']
      book.user = userId
      try {
        await Axios.post('/api/books', book)
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
    async deleteBooks({commit}, ids) {
      try {
        ids.forEach(async (id) => {
          await Axios.delete('/api/books/' + id)
          commit('removeBook', id)
        })
        this.selected = []
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
    },
    async getBook({}, id) {
      try {
        // @TODO - instead retrieve the book from the vuex array?
        const response = await Axios.get('/api/books/' + id)
        return response.data.book
      } catch (error) {
        throw error
      }
    },
    async updateBook({}, payload) {
      // No need to update the book array, since it will be refreshed when returning to the books index page
      const book = buildBook(payload)
      try {
        await Axios.put('/api/books/' + payload.id, book)
      } catch(error) {
        throw error
      }
    }
  }
}