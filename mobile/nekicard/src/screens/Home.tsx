import HeaderBgBlue from '@assets/HeaderBgBlue.png'
import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import ContactCard from '@components/ContactCard'
import DeitailInfoItem from '@components/DeitailInfoItem'
import { UserPhotoSelect } from '@components/index'
import { UserContext } from '@contexts/UserContext'
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons'
import { useUserPhotoSelect } from '@hooks/useUserPhotoSelect'
import { Link, useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  Toast,
  VStack,
} from 'native-base'
import { useContext, useState } from 'react'
import { ImageBackground } from 'react-native'
export default function Home() {
  const { fetchUserData } = useContext(UserContext)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { photoMutation } = useUserPhotoSelect()
  const [userPhotoURL, setUserPhotoURL] = useState<string | undefined>(
    undefined
  )

  const handlePhotoSelection = () => {
    photoMutation.mutate(undefined, {
      onSuccess: (data) => {
        setUserPhotoURL(`${data?.photo_URL}?timestamp=${Date.now()}`)
        fetchUserData()
        Toast.show({
          title: 'Foto alterada com sucesso',
          placement: 'top',
          alignItems: 'center',
          backgroundColor: 'green.500',
        })
      },
      onError: (error) => {
        Toast.show({
          title: error.message,
          placement: 'top',
          alignItems: 'center',
          backgroundColor: 'red.500',
        })
      },
    })
  }

  const handleSubmit = () => {
    navigation.navigate('additionalDetails')
  }

  const handleEditProfile = () => {
    navigation.navigate('editProfile')
  }
  return (
    <ScrollView>
      <ImageBackground
        source={HeaderBgBlue}
        style={{
          width: '100%',
          height: '100%',
        }}
        imageStyle={{
          height: 250,
          resizeMode: 'cover',
        }}
      >
        <VStack flex={1} px={'2'} pt={16} pb={4} alignItems={'center'}>
          <Box w={'full'} p={0} m={0} alignItems={'flex-end'}>
            <Icon
              as={EvilIcons}
              name="pencil"
              size={'32px'}
              color="gray.100"
              onPress={handleEditProfile}
            />
          </Box>

          <VStack
            id="body"
            w={'full'}
            justifyContent={'flex-start'}
            flex={1}
            space={'6'}
          >
            <VStack id="profileImage" space={'2'} mt={'20'}>
              <Center>
                <UserPhotoSelect
                  source={
                    userPhotoURL
                      ? { uri: `${userPhotoURL}` }
                      : defaultUserPhotoImg
                  }
                  alt="Foto do usuário"
                  size={150}
                  isLoading={photoMutation.isPending}
                />
                <Text
                  color={'gray.100'}
                  fontFamily={'bold'}
                  fontSize="2xl"
                  mt={2}
                >
                  Gabriel Damico
                </Text>
                <Text color={'gray.200'} fontFamily={'semibold'} fontSize="md">
                  Trainee
                </Text>
              </Center>
            </VStack>

            <VStack id="about" space={2}>
              <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                Sobre Mim
              </Heading>
              <Text
                color={'gray.200'}
                fontFamily={'regular'}
                fontSize={'md'}
                textAlign={'justify'}
              >
                Tenho 20 anos e sou apaixonado por programação desde pequeno.
                Espero poder contribuir com o desenvolvimento da empresa.
              </Text>
            </VStack>

            <VStack id="contacts" space={3}>
              <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                Meus Contatos
              </Heading>
              <HStack w={'full'} justifyContent={'space-between'}>
                <ContactCard
                  icon={<Icon as={Feather} name="link" />}
                  name="Meu Link"
                />
                <ContactCard
                  icon={<Icon as={Feather} name="mail" />}
                  name="Email"
                />
                <ContactCard
                  icon={<Icon as={Feather} name="phone" />}
                  name="Celular"
                />
              </HStack>
            </VStack>
            <VStack id="socialMedias" space={3}>
              <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                Redes Sociais
              </Heading>
              <HStack w={'full'} justifyContent={'space-between'}>
                <ContactCard
                  isHorizontal
                  icon={<Icon as={AntDesign} name="github" />}
                  name="Github"
                />
                <ContactCard
                  isHorizontal
                  icon={<Icon as={AntDesign} name="linkedin-square" />}
                  name="Linkedin"
                />
                <ContactCard
                  isHorizontal
                  icon={<Icon as={AntDesign} name="facebook-square" />}
                  name="Facebook"
                />
              </HStack>
            </VStack>

            <VStack id="details" space={2}>
              <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                Detalhes
              </Heading>
              <VStack space={2}>
                <DeitailInfoItem
                  label="Nome completo"
                  value="Gabriel Damico dos Santos"
                />
                <DeitailInfoItem
                  label="Data de nascimento"
                  value="25/09/2003"
                />
                <DeitailInfoItem label="Tempo de Neki" value="1 ano" />
                <DeitailInfoItem label="Localidade" value="Petrópolis, RJ" />
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </ImageBackground>
    </ScrollView>
  )
}
