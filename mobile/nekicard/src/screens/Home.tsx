import HeaderBgBlue from '@assets/HeaderBgBlue.png'
import HeaderBgDarkBlue from '@assets/HeaderBgDarkBlue.png'
import HeaderBgBlack from '@assets/HeaderBgBlack.png'
import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import ContactCard from '@components/ContactCard'
import DeitailInfoItem from '@components/DeitailInfoItem'
import { UserContext } from '@contexts/UserContext'
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons'
import { useUserPhotoSelect } from '@hooks/useUserPhotoSelect'
import { Link, useFocusEffect, useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/stack.routes'
import { storageCardGet } from '@storage/storageCard'
import * as Linking from 'expo-linking'
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
import { useCallback, useContext, useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'
import UserPhotoSelect from '@components/UserPhotoSelect'
import { sub } from 'date-fns'
export default function Home() {
  const { user, fetchUserData } = useContext(UserContext)
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const [headerPhoto, setHeaderPhoto] = useState(HeaderBgBlack)
  const findLinkedin = user.socialMediaList?.find(
    (item) => item.name == 'LINKEDIN'
  )?.url
  const findGithub = user.socialMediaList?.find(
    (item) => item.name == 'GITHUB'
  )?.url
  const findFacebook = user.socialMediaList?.find(
    (item) => item.name == 'FACEBOOK'
  )?.url

  useEffect(() => {
    fetchHeaderPhoto()
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchUserData()
      return () => null
    }, [])
  )

  const fetchHeaderPhoto = async () => {
    const { type } = await storageCardGet()
    switch (type) {
      case 'DARK_BLUE':
        setHeaderPhoto(HeaderBgDarkBlue)
        break
      case 'BLACK':
        setHeaderPhoto(HeaderBgBlack)
        break
      default:
        setHeaderPhoto(HeaderBgBlue)
    }
  }

  const handleEditProfile = () => {
    navigation.navigate('editProfile')
  }
  return (
    <ScrollView>
      <ImageBackground
        source={headerPhoto}
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
            <VStack id="profileImage" mt={'20'} space={2}>
              <UserPhotoSelect size={150} />
              <Center>
                <Text color={'gray.100'} fontFamily={'bold'} fontSize="2xl">
                  {user.name}
                </Text>
                <Text color={'gray.200'} fontFamily={'semibold'} fontSize="md">
                  {user.workFunction ? user.workFunction : 'Funcionário Neki'}
                </Text>
              </Center>
            </VStack>

            {user.description && (
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
                  {user.description}
                </Text>
              </VStack>
            )}

            <VStack id="contacts" space={3}>
              <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                Meus Contatos
              </Heading>
              <HStack w={'full'} justifyContent={'space-between'}>
                <ContactCard
                  icon={<Icon as={Feather} name="link" />}
                  name="Meu Link"
                  content={'http://meufrontend.com.br/user/' + user.id}
                  canCopy
                />
                <ContactCard
                  icon={<Icon as={Feather} name="mail" />}
                  name="Email"
                  content={user.email}
                  onPress={() => {
                    Linking.openURL('mailto:' + user.email)
                  }}
                />
                <ContactCard
                  icon={<Icon as={Feather} name="phone" />}
                  name="Celular"
                  content={user.phone}
                  onPress={() => {
                    Linking.openURL('tel:' + user.phone)
                  }}
                />
              </HStack>
            </VStack>
            {findFacebook || findGithub || findLinkedin ? (
              <VStack id="socialMedias" space={3}>
                <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                  Redes Sociais
                </Heading>
                <HStack w={'full'} justifyContent={'flex-start'} space={3}>
                  {findGithub && (
                    <ContactCard
                      isHorizontal
                      icon={<Icon as={AntDesign} name="github" />}
                      name="Github"
                      content={findGithub}
                    />
                  )}

                  {findLinkedin && (
                    <ContactCard
                      isHorizontal
                      icon={<Icon as={AntDesign} name="linkedin-square" />}
                      name="Linkedin"
                      content={findLinkedin}
                    />
                  )}

                  {findFacebook && (
                    <ContactCard
                      isHorizontal
                      icon={<Icon as={AntDesign} name="facebook-square" />}
                      name="Facebook"
                      content={findFacebook}
                    />
                  )}
                </HStack>
              </VStack>
            ) : null}

            <VStack id="details" space={2}>
              <Heading color={'gray.100'} fontFamily={'bold'} fontSize="xl">
                Detalhes
              </Heading>
              <VStack space={2}>
                <DeitailInfoItem
                  label="Data de nascimento"
                  value={user.birthdate}
                />

                {user.socialName && (
                  <DeitailInfoItem
                    label="Nome social"
                    value={user.socialName}
                  />
                )}
                {user.workTime && (
                  <DeitailInfoItem
                    label="Tempo de Neki"
                    value={user.workTime}
                  />
                )}
                {user.locality && (
                  <DeitailInfoItem label="Localidade" value={user.locality} />
                )}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </ImageBackground>
    </ScrollView>
  )
}
