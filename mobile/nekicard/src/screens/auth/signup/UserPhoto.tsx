import Button from '@components/Button'
import Title from '@components/Title'
import UserPhotoSelect from '@components/UserPhotoSelect'
import { AntDesign } from '@expo/vector-icons'
import { useUserPhotoSelect } from '@hooks/useUserPhotoSelect'
import { Link, RouteProp, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Box, Center, Icon, Text, Toast, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import { useContext, useState } from 'react'
import { UserContext } from '@contexts/UserContext'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import {
  storageAuthTempTokenGet,
  storageAuthTempTokenSave,
} from '@storage/storageAuthTempToken'

export default function UserPhoto() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { user } = useContext(UserContext)
  const [isPhotoAdded, setIsPhotoAdded] = useState(false)

  const handleSubmit = async () => {
    const token = await storageAuthTempTokenGet()
    await storageAuthTempTokenSave({
      ...token,
      addedPhoto: true,
    })
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

        <VStack id="body" w={'full'} justifyContent={'flex-start'} py={24}>
          <UserPhotoSelect
            editable
            size={150}
            callbackFunction={setIsPhotoAdded}
            photoUrl={user.profilePhotoUrl}
          />
        </VStack>
        <Button
          text="Próximo"
          variant={isPhotoAdded ? 'default' : 'disabled'}
          mt={2}
          onPress={handleSubmit}
        />
      </VStack>
    </LinearGradient>
  )
}
