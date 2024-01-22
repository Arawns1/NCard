import { storageAuthTokenGet } from '@storage/storageAuthToken'
import { AppError } from '@utils/AppError'
import axios, { AxiosError } from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.106:8082',
})

api.interceptors.request.use(
  async (request) => {
    const { token } = await storageAuthTokenGet()
    console.log(token)
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log(error.response.data)
      throw new AppError(error.response.data)
    } else if (error.request) {
      console.log(error.request)
      throw new AppError(error.request._response)
    } else {
      console.log('Error', error.message)
      throw new AppError(
        'Não foi possível acessar sua conta. Tente novamente mais tarde'
      )
    }
  }
)

export { api }
