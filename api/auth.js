import axios from 'axios'

export default {
  me: () => axios.get('users/me'),
  login: data => axios.post('authentication/login', data),
  signup: data => axios.post('authentication/signup', data),
  admin_login: data => axios.post('authentication/admin-login', data),
  admin_me: token =>
    axios.get('admins/me', { headers: { Authorization: token } }),

  restaurant_signup: data =>
    axios.post('authentication/restaurant-signup', data),
  restaurant_login: data => axios.post('authentication/restaurant-login', data),
  restaurant_me: token =>
    axios.get('restaurants/me', { headers: { Authorization: token } }),
}
