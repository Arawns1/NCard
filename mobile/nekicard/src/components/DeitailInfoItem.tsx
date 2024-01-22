import React from 'react'
import { HStack, Text } from 'native-base'

interface DetailInfoItemProps {
  label: string
  value: string
}
export default function DeitailInfoItem({ label, value }: DetailInfoItemProps) {
  return (
    <HStack>
      <Text color={'gray.200'} fontFamily={'bold'} fontSize={'md'}>
        {label}:{' '}
      </Text>
      <Text color={'gray.200'} fontFamily={'regular'} fontSize={'md'}>
        {value}
      </Text>
    </HStack>
  )
}
