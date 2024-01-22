import React from 'react'
import {
  HStack,
  Text,
  ICheckboxProps,
  Checkbox as NativeBaseCheckbox,
} from 'native-base'

interface CheckBoxProps extends ICheckboxProps {
  rememberCredentials?: boolean
  setRememberCredentials?: () => void
  label?: string
}
export default function Checkbox({
  label,
  rememberCredentials = true,
  setRememberCredentials,
  ...rest
}: CheckBoxProps) {
  return (
    <HStack justifyContent={'flex-start'} alignItems={'center'} space={3}>
      <NativeBaseCheckbox {...rest} />
      <Text color={'gray.200'}>{label}</Text>
    </HStack>
  )
}
