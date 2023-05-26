import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { StackRoutes } from './stack.routes'
import { TopMessage } from '../components/TopMessage'

export function AppRoutes() {
  const { top } = useSafeAreaInsets()
  return (
    <NavigationContainer>
      <StackRoutes />
      <Toast
        config={{ info: ({ text1 }) => <TopMessage message={String(text1)} /> }}
        topOffset={top}
      />
    </NavigationContainer>
  )
}
