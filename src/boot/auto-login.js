import { LocalStorage } from 'quasar'

export default async ({ store }) => {
  const token = LocalStorage.getItem('webToken')
  const userId = LocalStorage.getItem('userId')

  if(token && userId) {
    store.dispatch('auth/autoLogin', { token: token, userId: userId })
  } else {
    store.dispatch('auth/logout')
  }
}
