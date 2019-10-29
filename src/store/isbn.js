import Axios from 'axios'

export default {
  namespaced: true,

  state: {

  },

  getters: {

  },

  mutations: {

  },

  actions: {
    async fetchBook({}, isbn ) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await Axios.get('/api/isbn/' + isbn)
          console.log('Axios', result)
          resolve(result.data)
        } catch(err) {
          reject(err.response.data.error)
        }
      })
    
    }
  }
}