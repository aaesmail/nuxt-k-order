import { setAuthToken } from '~/utils/auth'

export default async function({ store, redirect }) {
  const userToken = localStorage.getItem('user-token')
  if (userToken) {
    setAuthToken(userToken)
    store.dispatch('auth/fetch_user')
  }

  store.dispatch('auth/fetch_admin')
  store.dispatch('auth/fetch_restaurant')
}
