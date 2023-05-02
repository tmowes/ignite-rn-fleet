import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../pages/Home'

const { Navigator, Screen } = createNativeStackNavigator()

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
