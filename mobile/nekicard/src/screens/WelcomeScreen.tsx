import React from 'react'
import BackgroundImg from '@assets/bg-login.jpg'
import { Image, VStack } from 'native-base'
import Button from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

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
