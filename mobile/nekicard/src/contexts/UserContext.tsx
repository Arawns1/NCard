import { UserProfileDTO } from '@dtos/UserProfile'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import { api } from '@services/axios'
import { storageAuthTempTokenGet } from '@storage/storageAuthTempToken'
import {
  StorageAuthTokenProps,
  storageAuthTokenGet,
  storageTokenRemove,
} from '@storage/storageAuthToken'

import { ReactNode, createContext, useEffect, useState } from 'react'

export type UserContextDataProps = {
  user: UserProfileDTO
  fetchUserData: () => void
  userToken: string | null
  handleSetToken: (token: string) => void
  getToken: () => Promise<string | StorageAuthTokenProps>
  logout: () => void
  isAuthenticated: () => boolean
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

  // async function fetchUser() {
  //   const { token } = await storageAuthTokenGet()
  //   if (token) {
  //     setUserToken(token)
  //   }
  // }

  // useEffect(() => {
  //   fetchUser()
  // }, [])

  // useEffect(() => {}, [userToken])

  // useEffect(() => {
  //   fetchUserData()
  // }, [])

  async function fetchUserData() {
    // const userResponse = await api.get('/user')
    // setUser(userResponse.data)
  }

  function handleSetToken(token: string) {
    setUserToken(token)
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
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
