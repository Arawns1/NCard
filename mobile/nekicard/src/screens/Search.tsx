import { UserContext } from '@contexts/UserContext'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import { api } from '@services/axios'
import { Box, Image, Toast, VStack } from 'native-base'
import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import NfcManager, { NfcTech, TagEvent } from 'react-native-nfc-manager'
import IconNfc from '../assets/nfc.png'
import Button from '@components/Button'
import { AntDesign } from '@expo/vector-icons'
import { IconButton } from 'native-base'
import Title from '@components/Title'
import { LinearGradient } from 'expo-linear-gradient'
import { Icon } from 'native-base'
// Pre-step, call this before any NFC operations
NfcManager.start()
export default function Search() {
  const { getToken } = useContext(UserContext)
  const [isReading, setIsReading] = useState(false)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  async function readNdef() {
    try {
      setIsReading(true)
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology([
        NfcTech.Ndef,
        NfcTech.NfcA,
        NfcTech.MifareClassic,
        NfcTech.NdefFormatable,
      ])
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag()
      if (tag) {
        await findUser(tag)
      }
    } catch (ex) {
      Toast.show({
        title:
          'Não foi possível encontrar o usuário. Tente novamente mais tarde',
        placement: 'bottom',
        alignItems: 'center',
        backgroundColor: 'red.500',
      })
    } finally {
      setIsReading(false)
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest()
    }
  }

  async function findUser(tag: TagEvent) {
    const response = await api.get(`/card/nfc/${tag.id}`, {
      headers: { Authorization: `Bearer ${await getToken()}` },
    })

    navigation.navigate('userFound', { card: response.data })
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgba(20, 50, 56, 1)', 'rgba(24, 24, 24, 1)']}
      locations={[0.1, 0.35]}
    >
      <VStack flex={1} px={'2'} pt={20} pb={4} alignItems={'center'}>
        <Title
          title="Buscar um Perfil"
          subtitle="Encoste um NekiCard no seu celular"
        />
        <VStack
          flex={1}
          w="full"
          py={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Image
            source={IconNfc}
            alt="Icone de nfc"
            width={120}
            height={120}
            opacity={0.7}
          />
        </VStack>

        <Button
          text="Ler NekiCard"
          onPress={readNdef}
          isLoading={isReading}
          mb={12}
          w="full"
          px={20}
        />
      </VStack>
    </LinearGradient>
  )
}
