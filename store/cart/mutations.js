export default {
  addItem(state, itemId) {
    state.items[itemId].amount++
  },

  addNewItem(state, item) {
    state.items[item.id] = { ...item }
  },

  removeItem(state, itemId) {
    state.items[itemId].amount--

    if (state.items[itemId].amount === 0) {
      const newItems = { ...state.items }
      delete newItems[itemId]
      state.items = newItems
    }
  },

  clearCart(state) {
    state.items = {}
  },
}
