import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig'

type StorageAuthTokenProps = {
  token: string
}

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token }))
}
export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  const { token }: StorageAuthTokenProps = response ? JSON.parse(response) : {}
  return { token }
}

export async function storageTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
