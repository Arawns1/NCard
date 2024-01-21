import Button from '@components/Button'
import { Input } from '@components/Input'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Checkbox,
  HStack,
  Heading,
  Icon,
  Text,
  Toast,
  VStack,
} from 'native-base'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from '@react-navigation/native'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/axios'

const SignInSchema = Yup.object({
  email: Yup.string().required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
})

export default function Login() {
  const { signIn } = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInRequestDTO>({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  async function handleSignIn(form: SignInRequestDTO) {
    signIn.mutate(form, {
      onSuccess: () => {
        Toast.show({
          title: 'Logado com sucesso',
          placement: 'top',
          alignItems: 'center',
          backgroundColor: 'green.500',
        })
      },
      onError: () => {
        Toast.show({
          title:
            'Não foi possível acessar sua conta. Tente novamente mais tarde',
          placement: 'top',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: 'red.500',
        })
      },
    })
  }

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

        <VStack w={'full'} alignItems={'center'} space={2} mt={'10'} id="title">
          <Heading color={'gray.100'} size={'xl'}>
            Faça seu Login
          </Heading>
          <Text fontFamily={'regular'} fontSize={'md'} color={'gray.300'}>
            Bem vindo(a) de volta!
          </Text>
        </VStack>

        <VStack id="form" w={'full'} mt={'20'} justifyContent={'center'}>
          <VStack id="inputs" space={'2'}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  leftIcon={<Icon as={Fontisto} name="email" />}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="password"
                  leftIcon={<Icon as={Fontisto} name="locked" />}
                  placeholder="Senha"
                  autoCorrect={false}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </VStack>
          <HStack
            id="additionalInfo"
            w={'full'}
            justifyContent={'space-between'}
          >
            <HStack space={3}>
              <Checkbox
                value="test"
                accessibilityLabel="Remember me checkbox"
                aria-label="Remember me checkbox"
                _checked={{
                  bg: 'gray.600',
                  borderColor: 'gray.500',
                  _pressed: {
                    borderColor: 'gray.600',
                    bg: 'gray.700',
                  },
                }}
                _icon={{ color: 'blue.500', opacity: 1 }}
                size={'md'}
              />
              <Text color={'gray.200'} fontSize={'md'} fontFamily={'regular'}>
                Lembrar-me
              </Text>
            </HStack>

            <Text color={'blue.600'} fontSize={'md'} fontFamily={'semibold'}>
              Esqueceu a senha?
            </Text>
          </HStack>
        </VStack>
        <Button
          text="Entrar"
          mt={24}
          isLoading={isSubmitting}
          onPress={handleSubmit(handleSignIn)}
        />
      </VStack>
    </LinearGradient>
  )
}
