export default {
  items: state => state.items,

  numberOfItems: state => Object.keys(state.items).length,

  totalPrice: state =>
    Object.values(state.items).reduce(
      (sum, item) => item.price * item.amount + sum,
      0
    ),
}
