import Button from '@components/Button'
import { Title, UserPhotoSelect } from '@components/index'
import { AntDesign } from '@expo/vector-icons'
import { useUserPhotoSelect } from '@hooks/useUserPhotoSelect'
import { Link, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Box, Center, Icon, Text, Toast, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import { useContext, useState } from 'react'
import { UserContext } from '@contexts/UserContext'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export default function UserPhoto() {
  const { fetchUserData } = useContext(UserContext)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
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

  const handleSubmit = () => {
    navigation.navigate('additionalDetails')
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgba(20, 50, 56, 1)', 'rgba(24, 24, 24, 1)']}
      locations={[0.1, 0.35]}
    >
      <VStack flex={1} px={'2'} pt={16} pb={4} alignItems={'center'}>
        <Box w={'full'} p={0} m={0}>
          <Link to={{ screen: 'welcomeScreen' }}>
            <Icon
              as={AntDesign}
              name="arrowleft"
              size={'32px'}
              color="gray.100"
            />
          </Link>
        </Box>

        <Title
          title="Adicione uma Foto"
          subtitle="Essa será a foto em seu perfil"
        />

        <VStack id="body" w={'full'} justifyContent={'flex-start'} flex={1}>
          <VStack id="imageInput" space={'2'} mt={'32'} mb={'24'}>
            <Center>
              <UserPhotoSelect
                source={
                  userPhotoURL
                    ? { uri: `${userPhotoURL}` }
                    : defaultUserPhotoImg
                }
                alt="Foto do usuário"
                size={150}
                isLoading={photoMutation.isPending}
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
          <Button
            text="Próximo"
            variant={!userPhotoURL ? 'disabled' : 'default'}
            mt={2}
            onPress={handleSubmit}
          />
        </VStack>
      </VStack>
    </LinearGradient>
  )
}
