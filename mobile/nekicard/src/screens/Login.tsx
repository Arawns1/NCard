import { Input } from '@components/Input'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { HStack, Heading, Icon, Text, VStack } from 'native-base'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'

type SignInFormData = {
  email: string
  senha: string
}

const SignInSchema = Yup.object({
  email: Yup.string().required('E-mail é obrigatório'),
  senha: Yup.string().required('Senha é obrigatória'),
})

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
  })

  return (
    <VStack flex={1} px={2} pt={16} pb={4} bg={'gray.700'}>
      <Icon as={AntDesign} name="arrowleft" size={'32px'} color="gray.100" />
      <VStack alignItems={'center'} space={2} id="title">
        <Heading color={'gray.100'}>Faça seu Login</Heading>
        <Text fontFamily={'semibold'} color={'gray.300'}>
          Bem vindo(a) de volta!
        </Text>
      </VStack>

      <VStack id="form" flex={1}>
        <VStack id="inputs" flex={1}>
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
            name="senha"
            render={({ field: { onChange, value } }) => (
              <Input
                variant="password"
                leftIcon={<Icon as={Fontisto} name="locked" />}
                placeholder="Senha"
                autoCorrect={false}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.senha?.message}
              />
            )}
          />
        </VStack>
        <HStack id="additionalInfo" flex={1} justifyContent={'space-between'}>
          <Text>Esqueceu a senha?</Text>
        </HStack>
      </VStack>
    </VStack>
  )
}
