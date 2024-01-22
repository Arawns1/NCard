import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { StackRoutes } from './stack.routes'
import TabRoutes from './app.routes'
export function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}
