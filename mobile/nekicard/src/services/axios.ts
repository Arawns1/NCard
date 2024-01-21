import axios from 'axios'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 1000,
})

export { api }
