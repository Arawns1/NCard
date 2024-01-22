import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateUserDTO } from '@dtos/updateUser'
import { UserProfileDTO } from '@dtos/UserProfile'
import { api } from '@services/axios'
import { UserContext } from '@contexts/UserContext'

export default function useUpdate() {
  const { user, fetchUserData } = useContext(UserContext)
  const update = useMutation({ mutationFn: updateRequest })

  async function updateRequest(form: updateUserDTO): Promise<UserProfileDTO> {
    console.log(user.id)
    const updatedForm = {
      ...form,
      mediaSocialList: [
        {
          name: 'LINKEDIN',
          url: 'https://linkedin.com.br/user',
        },
      ],
    }
    try {
      const response = await api.put(`/user/${user.id}`, updatedForm)
    } catch (error) {
      console.log(error)
    }

    console.log('aaaa')
    await fetchUserData()
    return response.data
  }

  return { update }
}
