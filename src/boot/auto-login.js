import { LocalStorage } from 'quasar'
import Axios from 'axios'

export default async ({ store }) => {
  const token = LocalStorage.getItem('webToken')
  const userId = LocalStorage.getItem('userId')

  if(token && userId) {
    // Verify token
    const response = await Axios.get('http://localhost:3000/auth/verify_credentials', {
      headers: {
        'x-auth-token': token
      }
    })
    store.dispatch('auth/autoLogin', { token: token, userId: userId })
  } else {
    store.dispatch('auth/logout')
  }
}
