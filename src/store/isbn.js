import Axios from 'axios'

export default {
  namespaced: true,

  actions: {
    async fetchBook({}, isbn ) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await Axios.get('/api/isbn/' + isbn)
          resolve(result.data)
        } catch(err) {
          reject(err.response)
        }
      })
    }
  }
}

// 9789021408644

// 9789462580701

// 9789024576777