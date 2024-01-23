import { UserProfileDTO } from '@dtos/UserProfile'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import { api } from '@services/axios'
import {
  storageAuthTempTokenGet,
  storageAuthTempTokenRemove,
} from '@storage/storageAuthTempToken'
import {
  StorageAuthTokenProps,
  storageAuthTokenGet,
  storageTokenRemove,
} from '@storage/storageAuthToken'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { JWTBody } from 'expo-jwt/dist/types/jwt'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { set } from 'date-fns'

export type UserContextDataProps = {
  user: UserProfileDTO
  fetchUserData: () => void
  userToken: string | null
  handleSetToken: (token: string) => void
  getToken: () => Promise<string | StorageAuthTokenProps>
  logout: () => void
  isAuthenticated: () => boolean
  handleSetUserPhoto: (PhotoUrl: string) => void
}

export const UserContext = createContext<UserContextDataProps>(
  {} as UserContextDataProps
)

type UserContextProviderProps = {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<UserProfileDTO>({} as UserProfileDTO)
  const [userToken, setUserToken] = useState<string | null>(null)
  const [userPhotoURL, setUserPhotoURL] = useState<string | undefined>()

  async function fetchUserData() {
    const userResponse = await api.get('/user', {
      headers: { Authorization: `Bearer ${await getToken()}` },
    })

    const user: UserProfileDTO = userResponse.data
    user.profilePhotoUrl = `${user.profilePhotoUrl}?timestamp=${Date.now()}`
    setUser(userResponse.data)
    return userResponse.data
  }

  function handleSetToken(token: string) {
    setUserToken(token)
  }

  function handleSetUserPhoto(PhotoUrl: string) {
    setUserPhotoURL(PhotoUrl)
  }

  function getUserPhotoURL() {
    return userPhotoURL
  }

  async function getToken() {
    if (userToken) {
      return userToken
    }
    const { token } = await storageAuthTokenGet()
    if (token) {
      setUserToken(token)
      return token
    }

    const { token: tempToken } = await storageAuthTempTokenGet()
    return tempToken
  }

  const isAuthenticated = () => {
    return !!userToken
  }

  async function logout() {
    setUserToken(null)
    await storageAuthTempTokenRemove()
    await storageTokenRemove()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        fetchUserData,
        handleSetToken,
        userToken,
        getToken,
        logout,
        isAuthenticated,
        handleSetUserPhoto,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
