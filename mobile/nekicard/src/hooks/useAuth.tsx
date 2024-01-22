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
import { storageUserSave } from '@storage/storageUser'
import {
  StorageAuthTempTokenProps,
  storageAuthTempTokenGet,
  storageAuthTempTokenSave,
} from '@storage/storageAuthTempToken'

export function useAuth() {
  const { handleSetToken, fetchUserData } = useContext(UserContext)
  const signIn = useMutation({ mutationFn: signInRequest })

  async function signInRequest(
    form: SignInRequestDTO
  ): Promise<AuthResponseDTO> {
    const response = await api.post(`/auth/signIn`, form)
    if (form.rememberCredentials)
      await storageAuthTokenSave(response.data.access_token)
    handleSetToken(response.data.access_token)
    return response.data
  }

  const signUp = useMutation({ mutationFn: signUpRequest })

  async function signUpRequest(
    form: SignUpRequestDTO
  ): Promise<AuthResponseDTO> {
    const response = await api.post(`/auth/signup`, form)
    await storageAuthTempTokenSave({ token: response.data.access_token })
    const { token } = await storageAuthTempTokenGet()
    return response.data
  }

  return { signIn, signUp }
}
