import { UserProfileDTO } from '@dtos/UserProfile'
import { api } from '@services/axios'

import { ReactNode, createContext, useState } from 'react'

export type UserContextDataProps = {
  user: UserProfileDTO
  fetchUserData: () => void
}

export const UserContext = createContext<UserContextDataProps>(
  {} as UserContextDataProps
)

type UserContextProviderProps = {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<UserProfileDTO>({} as UserProfileDTO)

  const fetchUserData = async () => {
    const response = await api.get('/user')
    setUser(response.data)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
