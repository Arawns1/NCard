import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateUserDTO } from '@dtos/updateUser'
import { UserProfileDTO } from '@dtos/UserProfile'
import { api } from '@services/axios'
import { UserContext } from '@contexts/UserContext'
import { fullUpdateUserDTO } from '@dtos/fullUpdateUserDTO'
import { SocialMedia } from '@dtos/SocialMedia'

export default function useUpdate() {
  const { user, getToken, fetchUserData } = useContext(UserContext)
  const update = useMutation({ mutationFn: updateRequest })
  const fullUpdate = useMutation({ mutationFn: fullUpdateRequest })

  async function updateRequest(form: updateUserDTO): Promise<UserProfileDTO> {
    const response = await api.put(`/user/${user.id}`, form, {
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
      },
    })
    return response.data
  }

  async function fullUpdateRequest(
    form: fullUpdateUserDTO
  ): Promise<UserProfileDTO> {
    console.log(form)
    console.log('Github')
    console.log(form.github)
    console.log(form.facebook)
    console.log(form.linkedin)
    const mediaSocialList: SocialMedia[] = []

    if (form.github) {
      mediaSocialList.push({ name: 'GITHUB', url: form.github })
    }
    if (form.facebook) {
      mediaSocialList.push({ name: 'FACEBOOK', url: form.facebook })
    }
    if (form.linkedin) {
      mediaSocialList.push({ name: 'LINKEDIN', url: form.linkedin })
    }

    const formattedForm = { ...form, mediaSocialList }

    console.log(formattedForm)
    const response = await api.put(`/user/${user.id}`, form, {
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
      },
    })
    fetchUserData()
    return response.data
  }

  return { update, fullUpdate }
}
