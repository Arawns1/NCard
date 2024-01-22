import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateUserDTO } from '@dtos/updateUser'
import { UserProfileDTO } from '@dtos/UserProfile'
import { api } from '@services/axios'
import { UserContext } from '@contexts/UserContext'

export default function useUpdate() {
  const { user } = useContext(UserContext)
  const update = useMutation({ mutationFn: updateRequest })

  async function updateRequest(form: updateUserDTO): Promise<UserProfileDTO> {
    const response = await api.put(`/user/${user.id}`, form)
    return response.data
  }

  return { update }
}
