import { UserContext } from '@contexts/UserContext'
import { AuthResponseDTO } from '@dtos/AuthResponse'
import { SignUpRequestDTO } from '@dtos/SignUpRequest'
import { api } from '@services/axios'
import { storageAuthTempTokenSave } from '@storage/storageAuthTempToken'
import { storageAuthTokenSave } from '@storage/storageAuthToken'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

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
    fetchUserData()
    return response.data
  }

  return { signIn, signUp }
}
