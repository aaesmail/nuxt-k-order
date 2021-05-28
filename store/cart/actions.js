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

    // make checkout request here
    await new Promise(resolve => setTimeout(resolve, 1000))

    commit('clearCart')
  },
}
