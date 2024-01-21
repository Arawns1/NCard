import Button from '@components/Button'
import { Title } from '@components/Title'
import { AntDesign } from '@expo/vector-icons'
import { Link } from '@react-navigation/native'
import { api } from '@services/axios'
import { LinearGradient } from 'expo-linear-gradient'
import { Box, Icon, VStack } from 'native-base'
export default function UserPhoto() {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['rgba(20, 50, 56, 1)', 'rgba(24, 24, 24, 1)']}
      locations={[0.1, 0.35]}
    >
      <VStack flex={1} px={'2'} pt={16} pb={4} alignItems={'center'}>
        <Box w={'full'} p={0} m={0}>
          <Link to={{ screen: 'welcomeScreen' }}>
            <Icon
              as={AntDesign}
              name="arrowleft"
              size={'32px'}
              color="gray.100"
            />
          </Link>
        </Box>

        <Title
          title="Adicione uma Foto"
          subtitle="Essa será a foto em seu perfil"
        />

        <VStack id="body" w={'full'} mt={'4'} justifyContent={'center'}>
          <VStack id="imageInput" space={'2'}></VStack>
        </VStack>
        <Button text="Próximo" mt={2} />
      </VStack>
    </LinearGradient>
  )
}
