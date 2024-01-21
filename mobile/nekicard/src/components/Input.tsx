import { Ionicons } from '@expo/vector-icons'
import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  Icon,
} from 'native-base'
import React, { useEffect, useRef, useState } from 'react'

export interface InputProps extends IInputProps {
  errorMessage?: string | null
  leftIcon?: React.ReactNode
  variant?: 'default' | 'password'
}

export const Input = (props: InputProps) => {
  const { variant = 'default' } = props

  switch (variant) {
    case 'password':
      return <PasswordInput {...props} />
    default:
      return <DefaultInput {...props} />
  }
}

export function DefaultInput({
  errorMessage = null,
  isInvalid,
  leftIcon,
  ...rest
}: InputProps) {
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} mb={4} w={'full'}>
      <NativeBaseInput
        bg={'gray.500'}
        h={16}
        px={1}
        borderWidth={0}
        fontSize={'md'}
        color="white"
        fontFamily={'regular'}
        placeholderTextColor={'gray.300'}
        isInvalid={invalid}
        _invalid={{ borderWidth: 1, borderColor: 'red.500' }}
        _focus={{
          bg: 'gray.400',
          borderColor: 'blue.500',
          borderWidth: 1,
        }}
        InputLeftElement={
          leftIcon ? (
            <Icon size="24px" ml={2} mr={1} color="gray.100" as={leftIcon} />
          ) : undefined
        }
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}

export function PasswordInput({
  errorMessage = null,
  isInvalid,
  leftIcon,
  ...rest
}: InputProps) {
  const invalid = !!errorMessage || isInvalid

  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  return (
    <FormControl isInvalid={invalid} mb={4} w={'full'}>
      <NativeBaseInput
        bg={'gray.500'}
        h={16}
        px={1}
        borderWidth={0}
        fontSize={'md'}
        color="white"
        fontFamily={'regular'}
        placeholderTextColor={'gray.300'}
        textContentType="password"
        secureTextEntry={!showPassword}
        isInvalid={invalid}
        _invalid={{ borderWidth: 1, borderColor: 'red.500' }}
        _focus={{
          bg: 'gray.400',
          borderColor: 'blue.500',
          borderWidth: 1,
        }}
        InputLeftElement={
          leftIcon ? (
            <Icon size="24px" ml={2} mr={1} color="gray.100" as={leftIcon} />
          ) : undefined
        }
        InputRightElement={
          <Icon
            size="24px"
            mx={2}
            color="gray.100"
            onPress={handleShowPassword}
            as={
              <Icon
                as={Ionicons}
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              />
            }
          />
        }
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
