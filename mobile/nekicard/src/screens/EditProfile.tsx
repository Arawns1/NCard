import ContactCard from '@components/ContactCard'
import DeitailInfoItem from '@components/DeitailInfoItem'
import { Button, Input, Title, UserPhotoSelect } from '@components/index'
import { updateUserDTO } from '@dtos/updateUser'
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Box, Center, HStack, Heading, Icon, Text, VStack } from 'native-base'
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
  const handlePhotoSelection = () => {}
  const handleUpdate = () => {}

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

  return (
    <KeyboardAwareScrollView>
      <LinearGradient
        style={{ flex: 1 }}
        colors={['rgba(20, 50, 56, 1)', 'rgba(24, 24, 24, 1)']}
        locations={[0.1, 0.35]}
      >
        <VStack flex={1} px={'2'} pt={16} pb={4} alignItems={'center'}>
          <Box w={'full'} p={0} m={0}>
            <Link to={{ screen: 'home' }}>
              <Icon
                as={AntDesign}
                name="arrowleft"
                size={'32px'}
                color="gray.100"
              />
            </Link>
          </Box>
          <Title title="Editar Perfil" />
          <VStack
            id="body"
            w={'full'}
            justifyContent={'flex-start'}
            flex={1}
            space={'6'}
          >
            <UserPhotoSelect size={150} />
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
                      placeholder="Uma breve descrição"
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

              <VStack id="contacts" space={'2'} bg={'red.100'} height={100}>
                <Text>Contatos Input</Text>
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
            </VStack>
          </VStack>
          <Button
            text="Salvar"
            mt={2}
            isLoading={isSubmitting}
            onPress={handleSubmit(handleUpdate)}
          />
        </VStack>
      </LinearGradient>
    </KeyboardAwareScrollView>
  )
}
