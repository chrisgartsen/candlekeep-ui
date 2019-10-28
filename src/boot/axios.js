import axios from 'axios'

export default ({ Vue, store }) => {

  axios.interceptors.request.use((config) => {
    config.baseURL = 'http://localhost:3000'
    const currentUser = store.getters['auth/currentUser']
    if(currentUser) config.headers = { 'x-auth-token': currentUser.webToken }
    
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  Vue.prototype.$axios = axios

}


