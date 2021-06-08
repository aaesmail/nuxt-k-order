import axios from 'axios'

export default {
  get_menu_items: token =>
    axios.get('restaurants/me/menu-items', {
      headers: { Authorization: token },
    }),
  add_menu_item: (token, item) =>
    axios.post('restaurants/me/menu-items', item, {
      headers: { Authorization: token },
    }),
  update_menu_item: (token, item) =>
    axios.patch(`restaurants/me/menu-items/${item.id}`, item, {
      headers: { Authorization: token },
    }),
  delete_menu_item: (token, id) =>
    axios.delete(`restaurants/me/menu-items/${id}`, {
      headers: { Authorization: token },
    }),
  get_incoming_orders: (token, delivered) =>
    axios.get(
      `restaurants/me/orders?page=1&limit=1000&delivered=${delivered}`,
      {
        headers: { Authorization: token },
      }
    ),
  set_order_delivered: (token, id) =>
    axios.patch(
      `restaurants/me/orders/${id}/delivered-status`,
      { delivered: true },
      {
        headers: { Authorization: token },
      }
    ),
  get_reviews: token =>
    axios.get(`restaurants/me/reviews?page=1&limit=1000`, {
      headers: { Authorization: token },
    }),
}
