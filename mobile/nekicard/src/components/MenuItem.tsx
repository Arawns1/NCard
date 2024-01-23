import React from 'react'
import {
  Box,
  Center,
  HStack,
  IButtonProps,
  Icon,
  Text,
  Pressable,
} from 'native-base'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

interface MenuItemProps extends IButtonProps {
  text: string
  icon: React.ReactNode
}

export default function MenuItem({ text, icon, ...rest }: MenuItemProps) {
  return (
    <Pressable {...rest} _pressed={{ opacity: 0.7 }}>
      <HStack
        w={'full'}
        h={16}
        bg={'gray.500'}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={2}
        borderWidth={1}
        borderColor={'gray.700'}
      >
        <HStack space={3} alignItems={'center'}>
          <Icon size="24px" ml={1} mr={1} color="gray.100" as={icon} />

          <Text fontFamily={'semibold'} fontSize={'md'} color={'gray.100'}>
            {text}
          </Text>
        </HStack>
        <Icon as={AntDesign} name={'right'} size={'22px'} color={'gray.100'} />
      </HStack>
    </Pressable>
  )
}
