import { api } from '@services/axios'
import { useMutation } from '@tanstack/react-query'
import { AuthResponseDTO } from '@dtos/AuthResponse'
import { SignUpRequestDTO } from '@dtos/SignUpRequest'
import { AppError } from '@utils/AppError'

export function useAuth() {
  const signIn = useMutation({ mutationFn: signInRequest })

  async function signInRequest(
    form: SignInRequestDTO
  ): Promise<AuthResponseDTO> {
    const response = await api.post(`/auth/signIn`, form)
    return response.data
  }

  const signUp = useMutation({ mutationFn: signUpRequest })

  async function signUpRequest(form: SignUpRequestDTO): Promise<any> {
    console.log('111')
    console.log(form)
    return await api
      .post(`/auth/signup`, form)
      .then((response) => response.data)
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          // and an instance of http.ClientRequest in node.js
          throw new AppError(error.request._response)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
      })
  }

  return { signIn, signUp }
}
