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
import EditProfile from '@screens/EditProfile'
import { useContext } from 'react'
import { UserContext } from '@contexts/UserContext'
import LinkCard from '@screens/LinkCard'
import UserFound from '@screens/UserFound'
import { TagEvent } from 'react-native-nfc-manager'
import { UserProfileDTO } from '@dtos/UserProfile'
import { Card } from '@dtos/Card'

export type AuthRoutes = {
  welcomeScreen: undefined
  login: undefined
  signUp: undefined
  userPhoto: undefined
  additionalDetails: undefined
  cardSelection: undefined
  menuPrincipal: undefined
  editProfile: undefined
  linkCard: undefined
  userFound: { card: Card }
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function StackRoutes() {
  const { isAuthenticated } = useContext(UserContext)
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'fade_from_bottom',
      }}
    >
      {isAuthenticated() ? (
        <>
          <Screen name="menuPrincipal" component={TabRoutes} />
          <Screen
            name="editProfile"
            component={EditProfile}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Screen name="linkCard" component={LinkCard} />
          <Screen name="userFound" component={UserFound} />
        </>
      ) : (
        <>
          <Screen name="welcomeScreen" component={WelcomeScreen} />
          <Screen name="login" component={Login} />
          <Screen name="signUp" component={SignUp} />
          <Screen name="userPhoto" component={UserPhoto} />
          <Screen name="additionalDetails" component={AdditionalDetails} />
          <Screen name="cardSelection" component={CardSelection} />
        </>
      )}
    </Navigator>
  )
}
