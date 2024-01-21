import React from 'react'
import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import WelcomeScreen from '@screens/WelcomeScreen'
import { NativeBaseProvider, StatusBar, Text } from 'native-base'
import { DEFAULT_THEME } from './src/themes/themes'
import Login from '@screens/Login'

function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })
  if (!fontsLoaded) {
    return null
  }

  return (
    <NativeBaseProvider theme={DEFAULT_THEME}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Login />
    </NativeBaseProvider>
  )
}

export default App
