import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import Login from '@screens/Login'
import SignUp from '@screens/SignUp'
import UserPhoto from '@screens/UserPhoto'
import WelcomeScreen from '@screens/WelcomeScreen'

type AuthRoutes = {
  welcomeScreen: undefined
  login: undefined
  signUp: undefined
  userPhoto: undefined
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
      <Screen name="welcomeScreen" component={WelcomeScreen} />
      <Screen name="login" component={Login} />
      <Screen name="signUp" component={SignUp} />
      <Screen name="userPhoto" component={UserPhoto} />
    </Navigator>
  )
}
