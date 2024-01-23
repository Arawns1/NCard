import AsyncStorage from '@react-native-async-storage/async-storage'

import { USER_STORAGE } from '@storage/storageConfig'

type StorageAuthTokenProps = {
  token: string
}

export async function storageUserSave(token: string) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify({ token }))
}
export async function storageUserGet() {
  const response = await AsyncStorage.getItem(USER_STORAGE)

  const { token }: StorageAuthTokenProps = response ? JSON.parse(response) : {}
  return { token }
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
