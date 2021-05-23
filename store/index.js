import cookie from 'cookie'
import { setAuthToken, resetAuthToken } from '~/utils/auth'

const checkUserToken = async (dispatch, context) => {
  const cookies = cookie.parse(context.req.headers.cookie || '')

  if (cookies.hasOwnProperty('user-access-token')) {
    setAuthToken(cookies['user-access-token'])
    try {
      await dispatch('auth/fetch_user')
      return true
    } catch (error) {
      console.log('Provided token is invalid:', error)
    }
  }
  resetAuthToken()
  return false
}

const checkAdminToken = async (dispatch, commit, context) => {
  const cookies = cookie.parse(context.req.headers.cookie || '')
  if (cookies.hasOwnProperty('admin-access-token')) {
    commit('auth/set_admin_token', cookies['admin-access-token'])
    try {
      await dispatch('auth/fetch_admin')
      return true
    } catch (error) {
      console.log(' admin token is invalid:', error)
    }
  }
  commit('auth/reset_admin')
  return false
}

export const actions = {
  nuxtServerInit({ dispatch, commit }, context) {
    return new Promise(async (resolve, reject) => {
      const userTokenFound = await checkUserToken(dispatch, context)
      const adminTokenFound = await checkAdminToken(dispatch, commit, context)
      resolve(userTokenFound || adminTokenFound)
    })
  },
}
