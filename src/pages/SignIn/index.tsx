import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { Realm, useApp } from '@realm/react'
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

import * as S from './styles'
import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button'

WebBrowser.maybeCompleteAuthSession()

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [_, response, googleSignIng] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  })

  const app = useApp()

  const handleGoogleSignIn = () => {
    setIsAuthenticating(true)

    googleSignIng().then((res) => {
      if (res?.type !== 'success') {
        setIsAuthenticating(false)
      }
    })
  }

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken) {
        const credentials = Realm.Credentials.jwt(response.authentication.idToken)

        app.logIn(credentials).catch((error) => {
          console.error(error)
          Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.')
          setIsAuthenticating(false)
        })
      } else {
        Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta google.')
        setIsAuthenticating(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  return (
    <S.Container source={backgroundImg}>
      <S.Title>Ignite Fleet</S.Title>
      <S.Slogan>Gestão de uso de veículos</S.Slogan>
      <Button
        title="Entrar com Google"
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
      />
    </S.Container>
  )
}
