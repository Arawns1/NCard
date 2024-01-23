import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { api } from '@services/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Toast } from 'native-base'
import { useContext } from 'react'
import { UserContext } from '@contexts/UserContext'
import { ImageResponseDTO } from '@dtos/ImageResponse'
export const useUserPhotoSelect = () => {
  const { user, getToken } = useContext(UserContext)

  const PHOTO_SIZE_LIMIT_MB = 10
  const photoMutation = useMutation({ mutationFn: handleUserPhotoSelect })

  async function handleUserPhotoSelect(): Promise<
    ImageResponseDTO | undefined
  > {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [4, 4],
      })

      if (photoSelected.canceled) throw new Error('Selecione uma foto')
      const PhotoURI = photoSelected.assets[0].uri

      if (PhotoURI) {
        const photoInfo = await FileSystem.getInfoAsync(PhotoURI)
        if (
          photoInfo.exists &&
          photoInfo.size > PHOTO_SIZE_LIMIT_MB * 1024 * 1024
        ) {
          throw new Error(
            `A imagem deve ter no máximo ${PHOTO_SIZE_LIMIT_MB}MB`
          )
        }
        const fileExtension = PhotoURI.split('.').pop()

        const photoFile = {
          name: `nekicard.${fileExtension}`.toLowerCase().replaceAll(' ', '_'),
          uri: PhotoURI,
          type: `image/${fileExtension}`,
        } as any

        const formData = new FormData()
        formData.append('image', photoFile)

        const { data } = await api.post('/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + (await getToken()),
          },
        })

        return data as ImageResponseDTO
      }
    } catch (error) {
      throw error
    }
  }

  return { photoMutation }
}
