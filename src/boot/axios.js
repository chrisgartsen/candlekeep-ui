import axios from 'axios'

export default ({ Vue, store, router }) => {

  // Set the web token in the request if it exists
  axios.interceptors.request.use((config) => {
    console.log("Intercepting")
    config.baseURL = 'http://localhost:3000'
    const token = store.getters['auth/token']
    if(token) config.headers = { 'x-auth-token': token }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Automatically logout the user when a 401 or 403 occurs

  axios.interceptors.response.use(null, (err) => {

    if (err.response.status == 401 && router.history.current.path != '/login') {
      store.dispatch('auth/logout')
      router.push('/login')
    } else {
      throw err
    }
  })

  Vue.prototype.$axios = axios

}
