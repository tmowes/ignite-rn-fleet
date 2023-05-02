import { NavigationContainer } from '@react-navigation/native'

import { StackRoutes } from './stack.routes'

export function AppRoutes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}
