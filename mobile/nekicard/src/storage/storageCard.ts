import AsyncStorage from '@react-native-async-storage/async-storage'

import { CARD_TOKEN_STORAGE } from '@storage/storageConfig'

type StorageAuthTokenProps = {
  token: string
}

export async function storageCardSave(token: string) {
  await AsyncStorage.setItem(CARD_TOKEN_STORAGE, JSON.stringify({ token }))
}
export async function storageCardGet() {
  const response = await AsyncStorage.getItem(CARD_TOKEN_STORAGE)

  const { token }: StorageAuthTokenProps = response ? JSON.parse(response) : {}
  return { token }
}

export async function storageCardRemove() {
  await AsyncStorage.removeItem(CARD_TOKEN_STORAGE)
}
