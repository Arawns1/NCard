import React from 'react'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { NativeBaseProvider, StatusBar, Text } from 'native-base'
import { DEFAULT_THEME } from 'src/themes/themes'
import SignIn from '@screens/SignIn'
import Loading from '@components/Loading'
function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={DEFAULT_THEME}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  )
}

export default App
