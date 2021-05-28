export default {
  addItem(state, itemId) {
    const itemIndex = state.items.findIndex(item => item.id === itemId)
    state.items[itemIndex].amount++
  },

  addNewItem(state, item) {
    const itemIndex = state.items.findIndex(it => it.id === item.id)

    if (itemIndex === -1) state.items.push({ ...item })
    else state.items[itemIndex].amount += item.amount
  },

  removeItem(state, itemId) {
    const itemIndex = state.items.findIndex(item => item.id === itemId)

    state.items[itemIndex].amount--

    if (state.items[itemIndex].amount === 0) state.items.splice(itemIndex, 1)
  },

  clearCart(state) {
    state.items = []
  },
}
