import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '@contexts/UserContext'
import { api } from '@services/axios'

export default function useSocialMedia() {
  const { user, getToken, fetchUserData } = useContext(UserContext)
  async function removeSocialMedia(socialName: string): Promise<any> {
    const response = await api.delete(
      `/socialmedia/${user.id}?socialMediaName=${socialName.toUpperCase()}`,
      {
        headers: {
          Authorization: 'Bearer ' + (await getToken()),
        },
      }
    )
    return response
  }

  return { removeSocialMedia }
}
