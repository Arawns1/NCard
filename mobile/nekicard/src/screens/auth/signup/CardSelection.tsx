import NekiCardBlack from '@assets/NekiCardBlack.png'
import NekiCardBlue from '@assets/NekiCardBlue.png'
import NekiCardDarkBlue from '@assets/NekiCardDarkBlue.png'
import { Button, Title, Input } from '@components/index'
import { AntDesign } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Box, Icon, Image, VStack } from 'native-base'
import React, { useContext, useState } from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { Dimensions, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { LinkCardDTO } from '@dtos/LinkCard'
import * as Yup from 'yup'
import { storageCardSave } from '@storage/storageCard'
import { cardTypes } from '@dtos/CardTypes'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import {
  storageAuthTempTokenGet,
  storageAuthTempTokenRemove,
  storageAuthTempTokenSave,
} from '@storage/storageAuthTempToken'
import { storageAuthTokenSave } from '@storage/storageAuthToken'
import { UserContext } from '@contexts/UserContext'
const cardSelectionSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
})

export default function CardSelection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { handleSetToken } = useContext(UserContext)
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(cardSelectionSchema),
    defaultValues: {
      name: '',
    },
  })

  const handleLinkCard: SubmitHandler<{ name: string }> = async ({ name }) => {
    const cardForm: LinkCardDTO = {
      type: cardTypes[activeSlide].type,
      name: name,
      nfcId: '',
    }
    await storageCardSave(cardForm)
    const { token } = await storageAuthTempTokenGet()
    handleSetToken(token)
    await storageAuthTokenSave(token)
    await storageAuthTempTokenRemove()
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgba(20, 50, 56, 1)', 'rgba(24, 24, 24, 1)']}
      locations={[0.1, 0.35]}
    >
      <KeyboardAwareScrollView>
        <VStack flex={1} px={'2'} pt={16} pb={4} alignItems={'center'}>
          <Box w={'full'} p={0} m={0}>
            <Icon
              onPress={() => navigation.navigate('additionalDetails')}
              as={AntDesign}
              name="arrowleft"
              size={'32px'}
              color="gray.100"
            />
          </Box>

          <Title
            title="Personalize seu Cartão"
            subtitle="Escolha o nome a cor que estará em seu cartão"
          />

          <VStack id="body" w={'full'} justifyContent={'flex-start'} flex={1}>
            <VStack id="imageInput" space={'2'} py={10}>
              <Carousel
                layout="stack"
                data={cardTypes}
                renderItem={({ item, index }) => {
                  let cardComponent

                  switch (item.type) {
                    case 'DARK_BLUE':
                      cardComponent = (
                        <Image
                          w={'full'}
                          h={'full'}
                          resizeMode="contain"
                          alt="Cartão Neki Azul Escuro"
                          source={NekiCardDarkBlue}
                        />
                      )
                      break
                    case 'BLACK':
                      cardComponent = (
                        <Image
                          w={'full'}
                          h={'full'}
                          resizeMode="contain"
                          alt="Cartão Neki Preto"
                          source={NekiCardBlack}
                        />
                      )
                      break
                    default:
                      cardComponent = (
                        <Image
                          w={'full'}
                          h={'full'}
                          alt="Cartão Neki Azul"
                          resizeMode="contain"
                          source={NekiCardBlue}
                        />
                      )
                  }

                  return (
                    <View
                      style={{
                        height: 200,
                        paddingRight: 20,
                      }}
                    >
                      {cardComponent}
                    </View>
                  )
                }}
                sliderWidth={Dimensions.get('screen').width}
                itemWidth={Dimensions.get('screen').width * 0.8}
                onSnapToItem={(index) => setActiveSlide(index)}
                activeSlideAlignment="center"
              />
              <Pagination
                dotsLength={cardTypes.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                  marginVertical: 0,
                  marginHorizontal: 0,
                  padding: 0,
                  height: 70,
                }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(45, 147, 156, 1)',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={1}
              />
            </VStack>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  leftIcon={<Icon as={AntDesign} name="creditcard" />}
                  placeholder="Nome que será impresso no cartão"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Button
              text="Próximo"
              isLoading={isSubmitting}
              mt={2}
              onPress={handleSubmit(handleLinkCard)}
            />
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </LinearGradient>
  )
}
