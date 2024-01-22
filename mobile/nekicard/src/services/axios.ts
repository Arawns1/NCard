import { AppError } from '@utils/AppError'
import axios, { AxiosError } from 'axios'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

api.interceptors.request.use(
  async (request) => {
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      throw new AppError(error.response.data)
    } else if (error.request) {
      throw new AppError(error.request._response)
    } else {
      throw new AppError(
        'Não foi possível acessar sua conta. Tente novamente mais tarde'
      )
    }
  }
)

export { api }
