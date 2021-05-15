const api = require('~/api').default
import { setAuthToken, resetAuthToken } from '~/utils/auth'
import cookies from 'js-cookie'

export const state = () => ({
  user: null,
  admin: null,
  admin_token: null,
})

export const mutations = {
  set_user(store, data) {
    store.user = { ...data }
  },
  reset_user(store) {
    store.user = null
  },
  set_admin(store, data) {
    store.admin = data
  },
  set_admin_token(store, data) {
    store.admin_token = data
  },
  reset_admin(store) {
    store.admin = null
    store.admin_token = null
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
    cookies.set('user-access-token', response.data.token, {
      expires: 7,
    })
    return response
  },
  logout_user({ commit }) {
    cookies.remove('user-access-token')
    commit('reset_user')
    return Promise.resolve()
  },
  async fetch_admin({ commit, state }) {
    try {
      const response = await api.auth.admin_me(state.admin_token)
      commit('set_admin', response.data.user)
      return response
    } catch (error) {
      commit('reset_admin')
      return error
    }
  },
  async login_admin({ commit, state }, data) {
    const response = await api.auth.admin_login(data)
    commit('set_admin_token', response.data.token)
    commit('set_admin', response.data.user)
    cookies.set('admin-access-token', response.data.token, {
      expires: 7,
    })
    return response
  },
  logout_admin({ commit }) {
    cookies.remove('admin-access-token')
    commit('reset_admin')
    return Promise.resolve()
  },
}
