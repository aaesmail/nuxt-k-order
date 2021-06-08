export const baseURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://127.0.0.1:8000/api/v1'
    : 'https://korder.herokuapp.com/api/v1'
