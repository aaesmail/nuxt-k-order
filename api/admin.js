import axios from 'axios'

export default {
  pending_restaurants: token =>
    axios.get('restaurants/requests', { headers: { Authorization: token } }),
  set_restaurants_confirm_status: (token, list) =>
    axios.patch('restaurants/confirm-status', list, {
      headers: { Authorization: token },
    }),
}
