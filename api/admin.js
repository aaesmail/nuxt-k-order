import axios from 'axios'

export default {
  pending_restaurants: token =>
    axios.get('restaurants/requests', { headers: { Authorization: token } }),
  set_restaurants_confirm_status: (token, list) =>
    axios.patch('restaurants/confirm-status', list, {
      headers: { Authorization: token },
    }),
  active_restaurants: () => axios.get('restaurants'),
  delete_restaurants: (token, list) =>
    axios.delete('restaurants', {
      headers: { Authorization: token },
      data: { ids: list },
    }),
}
