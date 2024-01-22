import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import ContactCard from '@components/ContactCard'
import DeitailInfoItem from '@components/DeitailInfoItem'
import { UserPhotoSelect } from '@components/index'
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons'
import { Link } from '@react-navigation/native'
import { Box, Center, HStack, Heading, Icon, VStack, Text } from 'native-base'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default function EditProfile() {
  return (
    <LinearGradient
    style={{ flex: 1 }}
    colors={['rgba(20, 50, 56, 1)', 'rgba(24, 24, 24, 1)']}
    locations={[0.1, 0.35]}
  >
    <KeyboardAwareScrollView>
        
      <VStack flex={1} px={'2'} pt={16} pb={4} alignItems={'center'}>
        <Box w={'full'} p={0} m={0} alignItems={'flex-end'}>
          <Link to={{ screen: 'welcomeScreen' }}>
            <Icon as={EvilIcons} name="pencil" size={'32px'} color="gray.100" />
          </Link>
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
                source={defaultUserPhotoImg}
                alt="Foto do usuário"
                size={150}
                // isLoading={photoMutation.isPending}
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
              <DeitailInfoItem label="Data de nascimento" value="25/09/2003" />
              <DeitailInfoItem label="Tempo de Neki" value="1 ano" />
              <DeitailInfoItem label="Localidade" value="Petrópolis, RJ" />
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </KeyboardAwareScrollView>
  )
}
