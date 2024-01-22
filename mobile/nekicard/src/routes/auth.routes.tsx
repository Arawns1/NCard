import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import AdditionalDetails from '@screens/auth/signup/AdditionalDetails'
import CardSelection from '@screens/auth/signup/CardSelection'
import Login from '@screens/auth/signin/Login'
import SignUp from '@screens/auth/signup/SignUp'
import UserPhoto from '@screens/auth/signup/UserPhoto'
import WelcomeScreen from '@screens/WelcomeScreen'
import TabRoutes from './app.routes'

type AuthRoutes = {
  welcomeScreen: undefined
  login: undefined
  signUp: undefined
  userPhoto: undefined
  additionalDetails: undefined
  cardSelection: undefined
  menuPrincipal: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'fade_from_bottom',
      }}
    >
      <Screen name="cardSelection" component={CardSelection} />
      <Screen name="welcomeScreen" component={WelcomeScreen} />
      <Screen name="login" component={Login} />
      <Screen name="signUp" component={SignUp} />
      <Screen name="userPhoto" component={UserPhoto} />
      <Screen name="additionalDetails" component={AdditionalDetails} />
      <Screen name="menuPrincipal" component={TabRoutes} />
    </Navigator>
  )
}
