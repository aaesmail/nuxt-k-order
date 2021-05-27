const api = require('~/api').default
import { setAuthToken, resetAuthToken } from '~/utils/auth'

export const state = () => ({
  user: { name: 'Ali' },
  admin: null,
})

export const mutations = {
  set_user(store, data) {
    store.user = data
  },
  reset_user(store) {
    store.user = null
  },
  set_admin(store, data) {
    store.admin = data
  },
  reset_admin(store) {
    store.admin = null
  },
}

export const actions = {
  async fetch_user({ commit }) {
    try {
      const response = await api.auth.me()
      commit('set_user', response.data.user)
      return response
    } catch (error) {
      commit('reset_user')
      return error
    }
  },
  async login_user({ commit }, data) {
    const response = await api.auth.login(data)
    commit('set_user', response.data.user)
    setAuthToken(response.data.token)
    localStorage.setItem('user-token', response.data.token)
    return response
  },
  logout_user({ commit }) {
    localStorage.removeItem('user-token')
    resetAuthToken()
    commit('reset_user')
    return Promise.resolve()
  },
  async fetch_admin({ commit }) {
    try {
      const adminToken = localStorage.getItem('admin-token')
      if (!adminToken) throw 'not authenticated'
      const response = await api.auth.admin_me(adminToken)
      commit('set_admin', response.data.user)
      return response
    } catch (error) {
      commit('reset_admin')
      return error
    }
  },
  async login_admin({ commit }, data) {
    const response = await api.auth.admin_login(data)
    commit('set_admin', response.data.user)
    localStorage.setItem('admin-token', response.data.token)
    return response
  },
  logout_admin({ commit }) {
    localStorage.removeItem('admin-token')
    commit('reset_admin')
    return Promise.resolve()
  },
}
