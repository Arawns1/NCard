import Button from '@components/Button'
import { Input, Title } from '@components/index'
import { updateUserDTO } from '@dtos/updateUser'
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import useUpdate from '@hooks/useUpdate'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { LinearGradient } from 'expo-linear-gradient'
import { Box, Icon, Toast, VStack } from 'native-base'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'

const updateUserSchema = Yup.object({
  name: Yup.string(),
  social: Yup.string(),
  phone: Yup.string().max(11, 'O telefone deve ter 11 dígitos'),
  workFunction: Yup.string(),
  worktime: Yup.string(),
  locality: Yup.string(),
})

export default function AdditionalDetails() {
  const { update } = useUpdate()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<updateUserDTO>({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      socialName: '',
      phone: '',
      workFunction: '',
      worktime: '',
      locality: '',
    },
  })
  async function handleUpdate(form: updateUserDTO) {
    update.mutate(form, {
      onSuccess: () => {
        Toast.show({
          title: 'Informações adicionadas com sucesso',
          placement: 'top',
          alignItems: 'center',
          backgroundColor: 'green.500',
        })
      },
      onError: (error) => {
        Toast.show({
          title:
            'Não foi possível cadastrar os dados. Tente novamente mais tarde',
          placement: 'top',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: 'red.500',
        })
      },
    })
    navigation.navigate('cardSelection')
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
              onPress={() => navigation.goBack()}
              as={AntDesign}
              name="arrowleft"
              size={'32px'}
              color="gray.100"
            />
          </Box>

          <Title
            title="Informações Adicionais"
            subtitle="Preencha com suas informações"
          />

          <VStack id="form" w={'full'} mt={'4'} justifyContent={'center'}>
            <VStack id="inputs" space={'2'}>
              <Controller
                control={control}
                name="socialName"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome social (opcional)"
                    textContentType="name"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="next"
                    leftIcon={<Icon as={FontAwesome5} name="user-circle" />}
                    errorMessage={errors.socialName?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Telefone (opcional)"
                    dataDetectorTypes={'phoneNumber'}
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    maxLength={11}
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="next"
                    leftIcon={<Icon as={Feather} name="phone" />}
                    errorMessage={errors.phone?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="workFunction"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Função na Neki (opcional) "
                    textContentType="jobTitle"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="next"
                    leftIcon={<Icon as={Feather} name="briefcase" />}
                    errorMessage={errors.workFunction?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="worktime"
                render={({ field: { onChange, value } }) => (
                  <Input
                    variant="date"
                    placeholder="Tempo de Neki (opcional)"
                    onChange={onChange}
                    returnKeyType="next"
                    leftIcon={<Icon as={AntDesign} name="clockcircleo" />}
                    errorMessage={errors.worktime?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="locality"
                render={({ field: { onChange, value } }) => (
                  <Input
                    leftIcon={<Icon as={Feather} name="map-pin" />}
                    textContentType="location"
                    dataDetectorTypes={'address'}
                    placeholder="Localidade (opcional)"
                    autoCorrect={false}
                    returnKeyType="done"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.locality?.message}
                  />
                )}
              />
            </VStack>
          </VStack>
          <VStack space={2} w={'full'}>
            <Button
              text="Próximo"
              mt={2}
              isLoading={isSubmitting}
              onPress={handleSubmit(handleUpdate)}
            />
            <Button
              text="Deixar para depois"
              variant="outline"
              mt={2}
              onPress={() => navigation.navigate('cardSelection')}
            />
          </VStack>
        </VStack>
      </KeyboardAwareScrollView>
    </LinearGradient>
  )
}
