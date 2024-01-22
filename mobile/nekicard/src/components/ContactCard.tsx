import React from 'react'
import { Box, Icon, VStack, Text, HStack } from 'native-base'
import { EvilIcons, Feather } from '@expo/vector-icons'

interface ContactCardProps {
  isHorizontal?: boolean
  icon: React.ReactNode
  name: string
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

export function DefaultContactCard({ icon, name }: ContactCardProps) {
  return (
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
  )
}
export function HorizontalContactCard({ icon, name }: ContactCardProps) {
  return (
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
  )
}
