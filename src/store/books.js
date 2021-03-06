import Axios from 'axios' 

const buildAuthor = (payload) => {
  let author

  if(typeof payload === 'object') {
    author = {
      _id: payload._id,
      name: payload.name
    }
  }

  if(typeof payload === 'string') {
    author = {
      name: payload
    }
  }
  return author
}

const buildSimpleObject = (payload) => {
  let obj

  if(typeof payload === 'object') {
    obj = {
      _id: payload._id,
      name: payload.name
    }
  }

  if(typeof payload === 'string') {
    obj = {
      name: payload
    }
  }
  return obj
}



const buildBook = (payload) => {
  return {
    isbn: payload.isbn ? payload.isbn : undefined,
    title: payload.title,
    author: payload.author? buildAuthor(payload.author) : undefined,
    publisher: payload.publisher ? buildSimpleObject(payload.publisher) : undefined,
    genre: payload.genre ? payload.genre : undefined,
    language: payload.language ? payload.language : undefined,
    publishedDate: payload.publishedDate ? payload.publishedDate : undefined,
    description: payload.description ? payload.description : undefined,
    thumbnail: payload.thumbnail ? payload.thumbnail : undefined
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
      book.user = rootGetters['auth/userId']
      try {
        await Axios.post('/api/books', book)
      } catch (err) {
        console.log(err.message)
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
        const response = await Axios.get('/api/books/' + id)
        return response.data.book
      } catch (error) {
        throw error
      }
    },
    async updateBook({ rootGetters }, payload) {
      // No need to update the book array, since it will be refreshed when returning to the books index page
      const book = buildBook(payload)
      book.user = rootGetters['auth/userId']
      try {
        await Axios.put('/api/books/' + payload.id, book)
      } catch(error) {
        throw error
      }
    }
  }
}