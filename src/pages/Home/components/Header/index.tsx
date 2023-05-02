import { TouchableOpacity } from 'react-native'

import { Power } from 'phosphor-react-native'
import { useUser, useApp } from '@realm/react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Container, Greeting, Message, Name, Picture } from './styles'
import theme from '../../../../theme'

export function Header() {
  const user = useUser()
  const { currentUser } = useApp()
  const { top } = useSafeAreaInsets()

  return (
    <Container style={{ paddingTop: top + 32 }}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }}
        placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />
      <Greeting>
        <Message>Olá</Message>

        <Name>{user?.profile.name}</Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={() => currentUser?.logOut()}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  )
}
