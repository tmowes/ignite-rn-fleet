import { StatusBar } from 'react-native'

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { ThemeProvider } from 'styled-components/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppProvider, UserProvider } from '@realm/react'
import { REALM_APP_ID } from '@env'

import { SignIn } from './pages/SignIn'
import { Loading } from './components/Loading'
import theme from './theme'
import { AppRoutes } from './routes/app.routes'
import { RealmProvider } from './libs/realm'

export function AppSrc() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ backgroundColor: theme.COLORS.GRAY_800 }}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <AppRoutes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
