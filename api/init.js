import axios from 'axios'
import { baseURL } from '../config'
import cookies from 'js-cookie'
import { setAuthToken, resetAuthToken } from '~/utils/auth'

axios.defaults.baseURL = baseURL
