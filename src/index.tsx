import { StatusBar } from 'react-native'

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { ThemeProvider } from 'styled-components/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppProvider, UserProvider } from '@realm/react'
import { REALM_APP_ID } from '@env'
import { WifiSlash } from 'phosphor-react-native'
import { useNetInfo } from '@react-native-community/netinfo'

import { RealmProvider, syncConfig } from './libs/realm'
import { Loading } from './components/Loading'
import { SignIn } from './pages/SignIn'
import { AppRoutes } from './routes/app.routes'
import theme from './theme'
import { TopMessage } from './components/TopMessage'

export function AppSrc() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })
  const { isConnected } = useNetInfo()

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ backgroundColor: theme.COLORS.GRAY_800 }}>
          {isConnected && <TopMessage message="Você está off-line" icon={WifiSlash} />}
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <UserProvider fallback={SignIn}>
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <AppRoutes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
