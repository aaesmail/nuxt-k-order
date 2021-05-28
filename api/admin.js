import axios from 'axios'

export default {
  pending_restaurants: token =>
    axios.get('restaurants/requests', { headers: { Authorization: token } }),
}
