import { Ionicons } from '@expo/vector-icons'
import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  Icon,
  Pressable,
} from 'native-base'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'

export interface InputProps extends IInputProps {
  errorMessage?: string | null
  leftIcon?: React.ReactNode
  onChange?: (value: any) => void
  variant?: 'default' | 'password' | 'date'
}

export const Input = (props: InputProps) => {
  const { variant = 'default' } = props

  switch (variant) {
    case 'password':
      return <PasswordInput {...props} />
    case 'date':
      return <DateInput {...props} />
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

export function DateInput({
  errorMessage = null,
  isInvalid,
  leftIcon,
  onChange,
  ...rest
}: InputProps) {
  const currentDate = new Date()
  const minimumDate = new Date().setFullYear(currentDate.getFullYear() - 100)
  const [date, setDate] = useState(new Date(1598051730000))
  const [show, setShow] = useState(false)
  const invalid = !!errorMessage || isInvalid

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
    if (onChange) {
      onChange(currentDate.toISOString().split('T')[0])
    }
  }

  const showDatepicker = () => {
    setShow(true)
  }
  return (
    <Pressable onPress={showDatepicker}>
      <FormControl isInvalid={invalid} mb={4} w={'full'}>
        <NativeBaseInput
          bg={'gray.500'}
          h={16}
          px={1}
          borderWidth={0}
          fontSize={'md'}
          color="white"
          fontFamily={'regular'}
          value={`${date.getDate()} / ${
            date.getMonth() + 1
          } / ${date.getFullYear()}`}
          placeholderTextColor={'gray.300'}
          textContentType="password"
          isInvalid={invalid}
          isReadOnly
          _invalid={{ borderWidth: 1, borderColor: 'red.500' }}
          InputLeftElement={
            leftIcon ? (
              <Icon size="24px" ml={2} mr={1} color="gray.100" as={leftIcon} />
            ) : undefined
          }
          {...rest}
        />
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      </FormControl>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          maximumDate={new Date()}
          minimumDate={new Date(minimumDate)}
          onChange={handleDateChange}
        />
      )}
    </Pressable>
  )
}
