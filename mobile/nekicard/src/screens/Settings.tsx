import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Button from '@components/Button'
import { storageTokenRemove } from '@storage/storageAuthToken'
import { UserContext } from '@contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'

export default function Settings() {
  const { logout } = useContext(UserContext)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  return (
    <View>
      <Text>Settings</Text>
      <Button text={'signout'} onPress={logout} />
    </View>
  )
}
