import { LocalStorage } from 'quasar'
import Axios from 'axios'

export default async ({ store, router }) => {
  const token = LocalStorage.getItem('webToken')
  const userId = LocalStorage.getItem('userId')

  if(token && userId) {
    // Verify token
    const response = await Axios.get('http://localhost:3000/auth/verify_credentials', { headers: { 'x-auth-token': token } })
    if(!response) { 
      store.dispatch('auth/logout')
      router.push('/login')
    } else {
      store.dispatch('auth/autoLogin', { token: token, userId: userId })
    }
  } else {
    store.dispatch('auth/logout')
  }
}
