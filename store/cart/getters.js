export default {
  items: state => state.items,

  numberOfItems: state => state.items.length,

  totalPrice: state =>
    state.items.reduce((sum, item) => item.price * item.amount + sum, 0),
}
