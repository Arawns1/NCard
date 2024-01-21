import React from 'react'
import BackgroundImg from '@assets/bg-login.jpg'
import { Image, VStack } from 'native-base'
import Button from '@components/Button'

export default function WelcomeScreen() {
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
        <Button text="Criar nova conta" />
        <Button variant={'outline'} text="Já possuo uma conta" />
      </VStack>
    </VStack>
  )
}
