import { LinearGradient } from 'expo-linear-gradient'
import { VStack, Text } from 'native-base'
import Title from '@components/Title'
import NfcManager, { NfcTech, TagEvent } from 'react-native-nfc-manager'
import { useContext, useEffect, useRef, useState } from 'react'
import Button from '@components/Button'
import AnimatedLottieView from 'lottie-react-native'
import { storageCardGet } from '@storage/storageCard'
import { api } from '@services/axios'
import { UserContext } from '@contexts/UserContext'

NfcManager.start()
export default function LinkCard() {
  const { getToken } = useContext(UserContext)

  const [isReadNfcError, setIsReadNfcError] = useState(false)
  const animation = useRef(null)
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(
        [
          NfcTech.Ndef,
          NfcTech.NfcA,
          NfcTech.MifareClassic,
          NfcTech.NdefFormatable,
        ],
        {
          alertMessage: 'Ready to do some custom stuff!',
        }
      )
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag()
      console.warn('Tag found', tag)
      setIsReadNfcError(false)
    } catch (ex) {
      console.warn('Oops!', ex)
      setIsReadNfcError(true)
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

    console.log(response.data)
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
      <VStack flex={1} px={'2'} pt={24} pb={4} alignItems={'center'}>
        <Title
          title="Vincular novo NekiCard"
          subtitle="Encoste o Cartão atrás de seu celular"
        />

        <AnimatedLottieView
          autoPlay
          loop
          style={{
            width: 200,
            height: 200,
          }}
          source={require('src/assets/nfcLottie.json')}
        />

        {isReadNfcError && <Button text="Tentar novamente" />}
      </VStack>
    </LinearGradient>
  )
}
