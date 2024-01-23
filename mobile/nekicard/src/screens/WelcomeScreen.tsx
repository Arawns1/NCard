import React, { useContext, useEffect } from 'react'
import BackgroundImg from '@assets/bg-login.jpg'
import { Image, VStack } from 'native-base'
import Button from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import { useNavigation } from '@react-navigation/native'
import { storageAuthTempTokenGet } from '@storage/storageAuthTempToken'
import { storageAuthTokenGet } from '@storage/storageAuthToken'
import { UserContext } from '@contexts/UserContext'

export default function WelcomeScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { handleSetToken } = useContext(UserContext)
  useEffect(() => {
    verifyToken()
    verifyTempToken()
  }, [])

  const verifyToken = async () => {
    const resp = await storageAuthTokenGet()
    if (resp.token) {
      handleSetToken(resp.token)
    }
  }

  const verifyTempToken = async () => {
    const resp = await storageAuthTempTokenGet()
    if (resp.token) {
      if (resp.addedAdditionalInfo) {
        navigation.navigate('cardSelection')
      } else if (resp.addedPhoto) {
        navigation.navigate('additionalDetails')
      } else {
        navigation.navigate('userPhoto')
      }
    }
  }

  return (
    <VStack flex={1} bg={'$gray700'}>
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Tela de fundo: Um homem segurando um neki card azul com a mão direita"
        w={'100%'}
        h={'70%'}
        resizeMode="cover"
        position={'relative'}
        top={0}
      />
      <VStack space={8} px={4}>
        <Button
          text="Criar nova conta"
          onPress={() => navigation.navigate('signUp')}
        />
        <Button
          variant={'outline'}
          text="Já possuo uma conta"
          onPress={() => navigation.navigate('login')}
        />
      </VStack>
    </VStack>
  )
}
