import { LinearGradient } from 'expo-linear-gradient'
import { VStack, Text, Toast, Box } from 'native-base'
import Title from '@components/Title'
import NfcManager, { NfcTech, TagEvent } from 'react-native-nfc-manager'
import { useContext, useEffect, useRef, useState } from 'react'
import Button from '@components/Button'
import { storageCardGet } from '@storage/storageCard'
import { api } from '@services/axios'
import { UserContext } from '@contexts/UserContext'
import IconNfc from '../assets/nfc.png'
import { Image } from 'native-base'
import { Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'

NfcManager.start()
export default function LinkCard() {
  const { getToken } = useContext(UserContext)
  const [isReadNfcError, setIsReadNfcError] = useState(false)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology([
        NfcTech.Ndef,
        NfcTech.NfcA,
        NfcTech.MifareClassic,
        NfcTech.NdefFormatable,
      ])
      const tag = await NfcManager.getTag()
      setIsReadNfcError(false)
      if (tag) {
        await handleLinkCard(tag)
      }
    } catch (ex) {
      setIsReadNfcError(true)
      console.warn('Oops!', ex)
      if (typeof ex === 'object' && ex !== null && 'message' in ex) {
        if (ex.message === 'Error! The nfc id already exists!') {
          return Toast.show({
            title:
              'Não foi possível vincular o cartão, nfc já vinculado a outro usuário',
            placement: 'bottom',
            alignItems: 'center',
            backgroundColor: 'red.500',
          })
        }
      }
      Toast.show({
        title: 'Erro ao vincular o cartão. Tente novamente mais tarde',
        placement: 'bottom',
        alignItems: 'center',
        backgroundColor: 'red.500',
      })
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest()
    }
  }

  async function handleLinkCard(tag: TagEvent) {
    const { type } = await storageCardGet()
    const form = { nfcId: tag.id, type: type }
    const response = await api.post('/card', form, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
    NfcManager.cancelTechnologyRequest()
    Toast.show({
      title: 'Cartão vinculado com sucesso!',
      placement: 'top',
      alignItems: 'center',
      backgroundColor: 'green.500',
    })
    navigation.navigate('menuPrincipal')
  }

  useEffect(() => {
    readNdef()
  })
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgba(20, 50, 56, 1)', 'rgba(24, 24, 24, 1)']}
      locations={[0.1, 0.35]}
    >
      <VStack flex={1} px={'2'} pt={20} pb={4} alignItems={'center'}>
        <Box w={'full'} p={0} m={0}>
          <Icon
            onPress={() => {
              NfcManager.cancelTechnologyRequest()
              navigation.navigate('menuPrincipal')
            }}
            as={AntDesign}
            name="arrowleft"
            size={'32px'}
            color="gray.100"
          />
        </Box>
        <Title
          title="Vincular novo NekiCard"
          subtitle="Encoste o Cartão atrás de seu celular"
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
            width={180}
            height={180}
            opacity={0.7}
          />
        </VStack>
        {isReadNfcError && (
          <Button text="Tentar novamente" mb={24} onPress={readNdef} />
        )}
      </VStack>
    </LinearGradient>
  )
}
