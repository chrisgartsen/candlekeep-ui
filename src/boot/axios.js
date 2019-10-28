import axios from 'axios'

export default ({ Vue, store }) => {

  // Set the web token in the request if it exists
  axios.interceptors.request.use((config) => {
    config.baseURL = 'http://localhost:3000'
    const token = store.getters['auth/token']
    if(token) config.headers = { 'x-auth-token': token }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Automatically logout the user when a 401 or 403 occurs

  axios.interceptors.response.use(null, (err) => {
    return new Promise(function (resolve, reject) {
      if (err.status == 401 || err.status == 404) {
        store.dispatch('auth/logout')
      }
      throw err;
    })
  })

  Vue.prototype.$axios = axios

}
