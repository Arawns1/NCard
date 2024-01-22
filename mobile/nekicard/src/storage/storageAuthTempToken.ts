import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TEMPTOKEN_STORAGE } from '@storage/storageConfig'

export type StorageAuthTempTokenProps = {
  token: string
  addedPhoto?: boolean
  addedAdditionalInfo?: boolean
}

export async function storageAuthTempTokenSave(
  data: StorageAuthTempTokenProps
) {
  await AsyncStorage.setItem(AUTH_TEMPTOKEN_STORAGE, JSON.stringify(data))
}
export async function storageAuthTempTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_TEMPTOKEN_STORAGE)

  const result: StorageAuthTempTokenProps = response ? JSON.parse(response) : {}
  return result
}

export async function storageAuthTempTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TEMPTOKEN_STORAGE)
}
