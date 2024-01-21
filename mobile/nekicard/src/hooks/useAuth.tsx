import { api } from '@services/axios'
import { useMutation } from '@tanstack/react-query'
import { AuthResponseDTO } from '@dtos/AuthResponse'
import { SignUpRequestDTO } from '@dtos/SignUpRequest'
import { AppError } from '@utils/AppError'
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'

export function useAuth() {
  const signIn = useMutation({ mutationFn: signInRequest })

  async function signInRequest(
    form: SignInRequestDTO
  ): Promise<AuthResponseDTO> {
    const response = await api.post(`/auth/signIn`, form)
    await storageAuthTokenSave(response.data.access_token)
    const { token } = await storageAuthTokenGet()
    return response.data
  }

  const signUp = useMutation({ mutationFn: signUpRequest })

  async function signUpRequest(
    form: SignUpRequestDTO
  ): Promise<AuthResponseDTO> {
    const response = await api.post(`/auth/signup`, form)
    await storageAuthTokenSave(response.data.access_token)
    return response.data
  }

  return { signIn, signUp }
}
