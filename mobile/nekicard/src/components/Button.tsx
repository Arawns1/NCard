import { Button as ButtonBase, IButtonProps, Text } from 'native-base'
import React from 'react'

interface ButtonProps extends IButtonProps {
  text: string
  variant?: 'default' | 'outline' | 'disabled'
}

export default function Button({ variant = 'default', ...props }: ButtonProps) {
  switch (variant) {
    case 'outline':
      return <OutlineButton {...props} />
    case 'disabled':
      return <DisabledButton {...props} />
    default:
      return <DefaultButton {...props} />
  }
}

export function DefaultButton({ text, ...rest }: ButtonProps) {
  return (
    <ButtonBase
      width={'100%'}
      height={16}
      px={'24px'}
      py={2}
      bg={'blue.500'}
      _pressed={{
        bg: 'blue.400',
        borderColor: 'blue.400',
      }}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      {...rest}
    >
      <Text color={'white'} fontFamily={'bold'} fontSize="sm">
        {text}
      </Text>
    </ButtonBase>
  )
}

export function DisabledButton({ text, ...rest }: ButtonProps) {
  return (
    <ButtonBase
      width={'100%'}
      height={16}
      px={'24px'}
      py={2}
      bg={'blue.700'}
      disabled
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      {...rest}
    >
      <Text color={'gray.200'} fontFamily={'bold'} fontSize="sm">
        {text}
      </Text>
    </ButtonBase>
  )
}

export function OutlineButton({ text, ...rest }: ButtonProps) {
  return (
    <ButtonBase
      width={'100%'}
      height={16}
      px={'24px'}
      py={2}
      bg={'transparent'}
      borderWidth={1}
      borderColor={'blue.500'}
      _pressed={{
        bg: 'transparent',
        borderColor: 'blue.400',
      }}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      {...rest}
    >
      <Text color={'blue.500'} fontFamily={'bold'} fontSize="sm">
        {text}
      </Text>
    </ButtonBase>
  )
}
