import React from 'react'
import { VStack, Image } from 'native-base'
import BackgroundImg from '@assets/bg-login.jpg'

import { StyleSheet } from 'react-native'
import Button from '@components/Button'

export default function SignIn() {
  return (
    <VStack flex={1} bg={'gray.700'}>
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Tela de fundo: Um homem segurando um neki card azul com a mão direita"
        width={'100%'}
        height={'70%'}
        resizeMode="cover"
        position={'relative'}
        top={0}
      />
      <VStack
        position={'absolute'}
        bottom={100}
        width={'full'}
        px={5}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        space={5}
      >
        <Button />
        <Button />
      </VStack>
    </VStack>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 644,
    width: '100%',
    backgroundColor: '#202020',
  },
})
