import { LinkCardDTO } from '@dtos/LinkCard'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { CARD_TOKEN_STORAGE } from '@storage/storageConfig'

export async function storageCardSave(data: LinkCardDTO) {
  await AsyncStorage.setItem(CARD_TOKEN_STORAGE, JSON.stringify(data))
}
export async function storageCardGet() {
  const response = await AsyncStorage.getItem(CARD_TOKEN_STORAGE)

  const data: LinkCardDTO = response ? JSON.parse(response) : {}
  return data
}

export async function storageCardRemove() {
  await AsyncStorage.removeItem(CARD_TOKEN_STORAGE)
}
