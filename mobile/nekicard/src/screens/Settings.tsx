import React, { useContext } from 'react'
import Button from '@components/Button'
import { storageTokenRemove } from '@storage/storageAuthToken'
import { UserContext } from '@contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import { Box, Center, HStack, Icon, VStack, Text } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import Title from '@components/Title'
import MenuItem from '@components/MenuItem'

export default function Settings() {
  const { logout } = useContext(UserContext)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgba(20, 50, 56, 1)', 'rgba(24, 24, 24, 1)']}
      locations={[0.1, 0.35]}
    >
      <VStack flex={1} px={'2'} pt={24} pb={4} alignItems={'center'}>
        <Title title="Configurações" />
        <VStack id="menuList" w="full" mt={20}>
          <MenuItem
            text="Vincular Cartão NFC"
            icon={<Icon as={AntDesign} name={'creditcard'} />}
            onPress={() => navigation.navigate('linkCard')}
          />
          <MenuItem
            text="Sair"
            icon={<Icon as={MaterialIcons} name={'logout'} />}
            onPress={logout}
          />
        </VStack>
      </VStack>
      <Center pb={3}>
        <HStack>
          <Text color={'gray.200'} fontFamily={'bold'}>
            NekiCard
          </Text>
          <Text color={'gray.200'} fontFamily={'light'}>
            {' '}
            - v1.0.0
          </Text>
        </HStack>
        <HStack>
          <Text color={'gray.200'} fontFamily={'light'}>
            Developed by
          </Text>
          <Text color={'gray.200'} fontFamily={'bold'}>
            {' '}
            Gabriel Damico
          </Text>
        </HStack>
      </Center>
    </LinearGradient>
  )
}
