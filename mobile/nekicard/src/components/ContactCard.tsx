import React from 'react'
import {
  Box,
  Icon,
  VStack,
  Text,
  HStack,
  IButtonProps,
  Toast,
} from 'native-base'
import { EvilIcons, Feather } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import * as Clipboard from 'expo-clipboard'
import { Pressable } from 'react-native'

interface ContactCardProps extends IButtonProps {
  isHorizontal?: boolean
  icon: React.ReactNode
  name: string
  content?: string
  canCopy?: boolean
}
export default function ContactCard({
  isHorizontal = false,
  ...rest
}: ContactCardProps) {
  if (isHorizontal) {
    return <HorizontalContactCard {...rest} />
  }
  return <DefaultContactCard {...rest} />
}

export function DefaultContactCard({
  icon,
  name,
  canCopy,
  content,
  onPress,
}: ContactCardProps) {
  const copyToClipboard = async () => {
    content ? await Clipboard.setStringAsync(content) : null
    Toast.show({
      title: 'Copiado!',
      backgroundColor: 'black',
      color: 'white',
      placement: 'bottom',
      duration: 1200,
    })
  }

  return (
    <Pressable onPress={canCopy ? copyToClipboard : onPress}>
      <VStack
        bg={'gray.500'}
        width={'112px'}
        height={'112px'}
        borderRadius={'md'}
        alignItems={'center'}
        justifyContent={'center'}
        space={2}
        borderWidth={2}
        borderColor={'gray.600'}
      >
        <Icon as={icon} size={'32px'} color="gray.100" />
        <Text color={'gray.100'} fontFamily={'light'} fontSize={'md'}>
          {name}
        </Text>
      </VStack>
    </Pressable>
  )
}
export function HorizontalContactCard({
  icon,
  name,
  content,
}: ContactCardProps) {
  return (
    <Pressable
      onPress={() => {
        Linking.openURL(content || '')
      }}
    >
      <HStack
        bg={'gray.500'}
        width={'112px'}
        height={'48px'}
        borderRadius={'md'}
        alignItems={'center'}
        justifyContent={'center'}
        space={2}
        borderWidth={2}
        borderColor={'gray.600'}
      >
        <Icon as={icon} size={'20px'} color="gray.100" />
        <Text color={'gray.100'} fontFamily={'light'} fontSize={'sm'}>
          {name}
        </Text>
      </HStack>
    </Pressable>
  )
}
