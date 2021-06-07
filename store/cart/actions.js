import axios from 'axios'

export default {
  addItem({ commit }, itemId) {
    commit('addItem', itemId)
  },

  addNewItem({ commit }, item) {
    commit('addNewItem', item)
  },

  removeItem({ commit }, itemId) {
    commit('removeItem', itemId)
  },

  async checkout({ commit, state }) {
    const requestBody = state.items.map(item => ({
      menuItem: item.id,
      quantity: item.amount,
    }))

    await axios.post('users/me/orders', requestBody)

    commit('clearCart')
  },
}
