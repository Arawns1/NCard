import { api } from '@services/axios'
import { useMutation } from '@tanstack/react-query'
import { AuthResponseDTO } from '@dtos/AuthResponse'
import { SignUpRequestDTO } from '@dtos/SignUpRequest'
import { AppError } from '@utils/AppError'
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'
import { useContext } from 'react'
import { UserContext } from '@contexts/UserContext'

export function useAuth() {
  const { fetchUserData } = useContext(UserContext)
  const signIn = useMutation({ mutationFn: signInRequest })

  async function signInRequest(
    form: SignInRequestDTO
  ): Promise<AuthResponseDTO> {
    const response = await api.post(`/auth/signIn`, form)
    await storageAuthTokenSave(response.data.access_token)
    await fetchUserData()
    return response.data
  }

  const signUp = useMutation({ mutationFn: signUpRequest })

  async function signUpRequest(
    form: SignUpRequestDTO
  ): Promise<AuthResponseDTO> {
    const response = await api.post(`/auth/signup`, form)
    await storageAuthTokenSave(response.data.access_token)
    await fetchUserData()
    return response.data
  }

  return { signIn, signUp }
}
