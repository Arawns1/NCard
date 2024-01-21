import Button from '@components/Button'
import { Input } from '@components/Input'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Checkbox, HStack, Icon, Text, Toast, VStack } from 'native-base'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useNavigation } from '@react-navigation/native'
import { useAuth } from '@hooks/useAuth'
import { Title } from '@components/Title'
import { FontAwesome5 } from '@expo/vector-icons'
import { SignUpRequestDTO } from '@dtos/SignUpRequest'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { AppError } from '@utils/AppError'

const SignUpSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .required('E-mail é obrigatório')
    .matches(
      /@(neki-it\.com\.br|neki\.com\.br)$/,
      'E-mail deve terminar com "@neki-it.com.br" ou "@neki.com.br"'
    ),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  birthDate: Yup.string().required('Data de nascimento é obrigatória'),
})

export default function SignUp() {
  const { signUp } = useAuth()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpRequestDTO>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      birthDate: '',
    },
  })
  async function handleSignUp(form: SignUpRequestDTO) {
    const changedForm = {
      ...form,
      birthDate: '2000-01-01',
    }
    signUp.mutate(changedForm, {
      onSuccess: () => {
        Toast.show({
          title: 'Cadastrado com sucesso',
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

        <Title
          title="Crie uma conta"
          subtitle="Preencha com suas informações"
        />

        <VStack id="form" w={'full'} mt={'4'} justifyContent={'center'}>
          <VStack id="inputs" space={'2'}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome Completo"
                  textContentType="name"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  leftIcon={<Icon as={FontAwesome5} name="user-circle" />}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  textContentType="emailAddress"
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
              name="birthDate"
              render={({ field: { onChange, value } }) => (
                <Input
                  variant="date"
                  placeholder="Data de nascimento"
                  onChange={onChange}
                  leftIcon={<Icon as={AntDesign} name="calendar" />}
                  errorMessage={errors.birthDate?.message}
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
        </VStack>
        <Button
          text="Entrar"
          mt={2}
          isLoading={isSubmitting}
          onPress={handleSubmit(handleSignUp)}
        />
      </VStack>
    </LinearGradient>
  )
}
