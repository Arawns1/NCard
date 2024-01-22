import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import { UserContext } from '@contexts/UserContext'
import { useUserPhotoSelect } from '@hooks/useUserPhotoSelect'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import {
  Center,
  IImageProps,
  Image,
  Skeleton,
  Text,
  Toast,
  VStack,
} from 'native-base'
import React, { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
type UserPhotoProps = IImageProps & {
  size: number
  isLoading?: boolean
}

export default function UserPhotoSelect({
  size,
  isLoading = false,
  ...rest
}: UserPhotoProps) {
  if (isLoading) {
    return (
      <Skeleton
        w={size}
        h={size}
        rounded="full"
        startColor={'gray.500'}
        endColor={'gray.400'}
      />
    )
  }

  const { fetchUserData } = useContext(UserContext)
  const { photoMutation } = useUserPhotoSelect()
  const [userPhotoURL, setUserPhotoURL] = useState<string | undefined>(
    undefined
  )

  const handlePhotoSelection = () => {
    photoMutation.mutate(undefined, {
      onSuccess: (data) => {
        setUserPhotoURL(`${data?.photo_URL}?timestamp=${Date.now()}`)
        fetchUserData()
        Toast.show({
          title: 'Foto alterada com sucesso',
          placement: 'top',
          alignItems: 'center',
          backgroundColor: 'green.500',
        })
      },
      onError: (error) => {
        Toast.show({
          title: error.message,
          placement: 'top',
          alignItems: 'center',
          backgroundColor: 'red.500',
        })
      },
    })
  }

  return (
    <VStack id="imageInput" space={'2'}>
      <Center>
        <Image
          w={size}
          h={size}
          rounded={'full'}
          {...rest}
          borderWidth={2}
          borderColor={'gray.400'}
          source={
            userPhotoURL ? { uri: `${userPhotoURL}` } : defaultUserPhotoImg
          }
          alt="Foto do usuário"
        />

        <TouchableOpacity onPress={handlePhotoSelection}>
          <Text
            color={'blue.600'}
            fontWeight={'bold'}
            fontSize="md"
            mt={2}
            mb={8}
          >
            Alterar foto
          </Text>
        </TouchableOpacity>
      </Center>
    </VStack>
  )
}
