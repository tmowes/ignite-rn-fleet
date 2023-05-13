import { TouchableOpacity } from 'react-native'

import { Power } from 'phosphor-react-native'
import { useUser, useApp } from '@realm/react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

export function Header() {
  const user = useUser()
  const { COLORS } = useTheme()
  const { currentUser } = useApp()
  const { top } = useSafeAreaInsets()

  return (
    <S.Container style={{ paddingTop: top + 32 }}>
      <S.Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <S.Greeting>
        <S.Message>Olá</S.Message>
        <S.Name>{user?.profile.name}</S.Name>
      </S.Greeting>
      <TouchableOpacity activeOpacity={0.7} onPress={() => currentUser?.logOut()}>
        <Power size={32} color={COLORS.GRAY_400} />
      </TouchableOpacity>
    </S.Container>
  )
}
