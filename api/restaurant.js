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
}
