import ContactCard from '@components/ContactCard'
import DeitailInfoItem from '@components/DeitailInfoItem'
import { Button, Input, Title, UserPhotoSelect } from '@components/index'
import { UserContext } from '@contexts/UserContext'
import { updateUserDTO } from '@dtos/updateUser'
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import useUpdate from '@hooks/useUpdate'
import { Link, useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import { LinearGradient } from 'expo-linear-gradient'
import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  Text,
  Toast,
  VStack,
} from 'native-base'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'
const updateUserSchema = Yup.object({
  name: Yup.string(),
  description: Yup.string(),
  social: Yup.string(),
  phone: Yup.string().max(11, 'O telefone deve ter 11 dígitos'),
  workFunction: Yup.string(),
  worktime: Yup.string(),
  locality: Yup.string(),
})
export default function EditProfile() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { user, fetchUserData } = useContext(UserContext)
  const { update } = useUpdate()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<updateUserDTO>({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      socialName: '',
      description: '',
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
  }

  return (
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
                        placeholder={
                          'Função na Neki (Atual: ' + user.workFunction + ')'
                        }
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
                        placeholder={
                          'Tempo de Neki (Atual: ' + user.workTime + ')'
                        }
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
                      errorMessage={errors.workFunction?.message}
                    />
                  )}
                />
              </VStack>

              <VStack id="contacts" space={'2'} height={100}>
                <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                  Contatos
                </Heading>
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
              </VStack>

              <VStack id="socialMedia" space={'2'} height={100}>
                <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                  Redes Sociais
                </Heading>
                <Controller
                    control={control}
                    name="github"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        placeholder={
                          'https://github.com/seuUsuário'
                        }
                        onChange={onChange}
                        returnKeyType="next"
                        leftIcon={<Icon as={AntDesign} name="clockcircleo" />}
                        errorMessage={errors.worktime?.message}
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
                      placeholder={
                        'Nome social (Atual: ' + user.socialName + ')'
                      }
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
                  name="locality"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      leftIcon={<Icon as={Feather} name="map-pin" />}
                      textContentType="location"
                      dataDetectorTypes={'address'}
                      placeholder={'Localidade (Atual: ' + user.locality + ')'}
                      autoCorrect={false}
                      returnKeyType="done"
                      onChangeText={onChange}
                      value={value}
                      errorMessage={errors.locality?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder={'Telefone (Atual: ' + user.phone + ')'}
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
            </VStack>
          </VStack>
          <Button
            text="Salvar"
            mt={2}
            isLoading={update.isPending}
            onPress={handleSubmit(handleUpdate)}
          />
        </VStack>
      </LinearGradient>
    </KeyboardAwareScrollView>
  )
}
