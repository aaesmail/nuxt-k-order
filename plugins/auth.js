import { setAuthToken } from '~/utils/auth'

export default async function({ store, route, redirect }) {
  const userToken = localStorage.getItem('user-token')
  if (userToken) {
    setAuthToken(userToken)
    await store.dispatch('auth/fetch_user')
  }

  await store.dispatch('auth/fetch_admin')
  await store.dispatch('auth/fetch_restaurant')
}
