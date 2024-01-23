import Input from '@components/Input'
import Button from '@components/Button'
import Title from '@components/Title'
import UserPhotoSelect from '@components/UserPhotoSelect'
import { UserContext } from '@contexts/UserContext'
import { fullUpdateUserDTO } from '@dtos/fullUpdateUserDTO'
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import useUpdate from '@hooks/useUpdate'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import { LinearGradient } from 'expo-linear-gradient'
import {
  Accordion,
  Box,
  Center,
  Heading,
  Icon,
  Toast,
  VStack,
  View,
} from 'native-base'
import { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'
const fullUpdateUserSchema = Yup.object({
  name: Yup.string(),
  description: Yup.string(),
  social: Yup.string(),
  phone: Yup.string().max(11, 'O telefone deve ter 11 dígitos'),
  workFunction: Yup.string(),
  worktime: Yup.string(),
  locality: Yup.string(),
  github: Yup.string().url('Insira uma URL válida'),
  facebook: Yup.string().url('Insira uma URL válida'),
  linkedin: Yup.string().url('Insira uma URL válida'),
})
export default function EditProfile() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { user, fetchUserData } = useContext(UserContext)
  const { fullUpdate } = useUpdate()

  useEffect(() => {
    fetchUserData()
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<fullUpdateUserDTO>({
    resolver: yupResolver(fullUpdateUserSchema),
    defaultValues: {
      socialName: user.socialName || '',
      description: user.description || '',
      phone: user.phone || '',
      workFunction: user.workFunction || '',
      worktime: user.workTime || '',
      locality: user.locality || '',
      github:
        user.socialMediaList?.find((item) => item.name === 'GITHUB')?.url || '',
      facebook:
        user.socialMediaList?.find((item) => item.name === 'FACEBOOK')?.url ||
        '',
      linkedin:
        user.socialMediaList?.find((item) => item.name === 'LINKEDIN')?.url ||
        '',
    },
  })

  async function handleUpdate(form: fullUpdateUserDTO) {
    fullUpdate.mutate(form, {
      onSuccess: () => {
        Toast.show({
          title: 'Informações adicionadas com sucesso',
          placement: 'top',
          alignItems: 'center',
          backgroundColor: 'green.500',
        })
        navigation.navigate('menuPrincipal')
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
  }

  return (
    <>
      <KeyboardAwareScrollView>
        <LinearGradient
          style={{ flex: 1 }}
          colors={['rgba(20, 50, 56, 1)', 'rgba(24, 24, 24, 1)']}
          locations={[0.1, 0.35]}
        >
          <VStack flex={1} px={'2'} pt={16} pb={4} alignItems={'center'}>
            <Box w={'full'} p={0} m={0}>
              <Icon
                as={AntDesign}
                name="arrowleft"
                size={'32px'}
                color="gray.100"
                onPress={() => {
                  navigation.navigate('menuPrincipal')
                }}
              />
            </Box>
            <Title title="Editar Perfil" />
            <VStack
              id="body"
              w={'full'}
              justifyContent={'flex-start'}
              flex={1}
              space={'6'}
              mt={2}
            >
              <UserPhotoSelect size={150} editable />
              <VStack id="form" w={'full'} justifyContent={'center'}>
                <VStack id="workInfos" w={'full'} space={3}>
                  <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                    Minha Função
                  </Heading>
                  <VStack space={0}>
                    <Controller
                      control={control}
                      name="workFunction"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          label="Função na Neki"
                          placeholder={'Ex.: Desenvolvedor Júnior'}
                          textContentType="jobTitle"
                          autoCapitalize="none"
                          returnKeyType="next"
                          leftIcon={<Icon as={Feather} name="briefcase" />}
                          onChangeText={onChange}
                          value={value}
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
                          label="Tempo de Neki"
                          placeholder={'Ex.: 01/01/2000'}
                          onChange={onChange}
                          returnKeyType="next"
                          leftIcon={<Icon as={AntDesign} name="clockcircleo" />}
                          errorMessage={errors.worktime?.message}
                        />
                      )}
                    />
                  </VStack>
                </VStack>

                <VStack id="description" w={'full'} space={3}>
                  <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                    Descrição
                  </Heading>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        variant="textArea"
                        placeholder="Adicione uma breve descrição"
                        textContentType="jobTitle"
                        autoCapitalize="none"
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                        leftIcon={<Icon as={Feather} name="briefcase" />}
                        errorMessage={errors.description?.message}
                      />
                    )}
                  />
                </VStack>

                <VStack id="contacts" space={'2'}>
                  <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                    Contatos
                  </Heading>

                  <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        label="Telefone"
                        placeholder="(00) 00000-0000"
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
                </VStack>

                <VStack id="socialMedia" space={'2'}>
                  <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                    Redes Sociais
                  </Heading>
                  <Controller
                    control={control}
                    name="github"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        variant="socialMedia"
                        placeholder="Link para seu github"
                        autoCapitalize="none"
                        id="github"
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                        leftIcon={<Icon as={AntDesign} name="github" />}
                        errorMessage={errors.github?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="facebook"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        variant="socialMedia"
                        id="facebook"
                        placeholder="Link para seu facebook"
                        autoCapitalize="none"
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                        leftIcon={
                          <Icon as={AntDesign} name="facebook-square" />
                        }
                        errorMessage={errors.github?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="linkedin"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder="Link para seu linkedin"
                        id="linkedin"
                        autoCapitalize="none"
                        variant="socialMedia"
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                        leftIcon={
                          <Icon as={AntDesign} name="linkedin-square" />
                        }
                        errorMessage={errors.github?.message}
                      />
                    )}
                  />
                </VStack>

                <VStack id="details" w={'full'} space={3}>
                  <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                    Detalhes
                  </Heading>
                  <Controller
                    control={control}
                    name="socialName"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder={'Seu nome social'}
                        textContentType="name"
                        label="Nome Social"
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
                    name="locality"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        leftIcon={<Icon as={Feather} name="map-pin" />}
                        textContentType="location"
                        label="Localidade"
                        dataDetectorTypes={'address'}
                        placeholder={'Cidade, uf'}
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
            </VStack>
          </VStack>
        </LinearGradient>
      </KeyboardAwareScrollView>
      <Center w={'full'} safeAreaBottom p={2}>
        <Button
          text="Salvar"
          width={'80%'}
          isLoading={fullUpdate.isPending}
          onPress={handleSubmit(handleUpdate)}
        />
      </Center>
    </>
  )
}
