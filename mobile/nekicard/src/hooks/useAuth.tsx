import { api } from '@services/axios'
import { useMutation } from '@tanstack/react-query'
import { AuthResponseDTO } from '@dtos/AuthResponse'

export function useAuth() {
  const signIn = useMutation({ mutationFn: signInRequest })

  async function signInRequest(
    form: SignInRequestDTO
  ): Promise<AuthResponseDTO> {
    const response = await api.post(`/auth/signIn`, form)
    return response.data
  }

  const signUp = useMutation({ mutationFn: signUpRequest })

  async function signUpRequest(
    form: SignUpRequestDTO
  ): Promise<AuthResponseDTO> {
    const response = await api.post(`/auth/signUp`, form)
    return response.data
  }

  return { signIn, signUp }
}
