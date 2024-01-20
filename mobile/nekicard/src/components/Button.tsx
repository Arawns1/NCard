import { View, Text } from 'react-native'
import { Button as ButtonBase } from 'native-base'
import React from 'react'

export default function Button() {
  return (
    <ButtonBase
      width={'100%'}
      height={'100%'}
      px={'24px'}
      py={2}
      bg={'blue.500'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      space
    >
      Texto do Botão
    </ButtonBase>
  )
}
