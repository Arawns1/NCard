import { Button as ButtonBase, IButtonProps, Text } from 'native-base'
import React from 'react'

interface ButtonProps extends IButtonProps {
  text: string
  variant?: 'default' | 'outline'
}

export default function Button({
  text,
  variant = 'default',
  ...rest
}: ButtonProps) {
  return (
    <ButtonBase
      width={'100%'}
      height={16}
      px={'24px'}
      py={2}
      bg={variant === 'outline' ? 'transparent' : 'blue.500'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor={'blue.500'}
      _pressed={{
        bg: variant === 'outline' ? 'transparent' : 'blue.400',
        borderColor: variant === 'outline' ? 'blue.400' : 'blue.400',
      }}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? 'blue.500' : 'white'}
        fontFamily={'bold'}
        fontSize="sm"
      >
        {text}
      </Text>
    </ButtonBase>
  )
}
