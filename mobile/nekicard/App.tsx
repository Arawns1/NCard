import React from 'react'
import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { NativeBaseProvider, StatusBar } from 'native-base'
import { DEFAULT_THEME } from './src/themes/themes'
import { Routes } from '@routes/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserPhoto from '@screens/auth/signup/UserPhoto'
import { UserContextProvider } from './src/contexts/UserContext'
import CardSelection from '@screens/auth/signup/CardSelection'

function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })
  const queryClient = new QueryClient()
  if (!fontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={DEFAULT_THEME}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <UserContextProvider>
          <Routes />
        </UserContextProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  )
}

export default App
