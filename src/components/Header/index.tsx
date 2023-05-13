import { TouchableOpacity } from 'react-native'

import { ArrowLeft } from 'phosphor-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'

import * as S from './styles'
import { HeaderProps } from './types'

export function Header(props: HeaderProps) {
  const { title } = props
  const { COLORS } = useTheme()
  const { top } = useSafeAreaInsets()
  const { goBack } = useNavigation()

  return (
    <S.Container style={{ paddingTop: top + 32 }}>
      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <ArrowLeft size={24} weight="bold" color={COLORS.BRAND_LIGHT} />
      </TouchableOpacity>

      <S.Title>{title}</S.Title>
    </S.Container>
  )
}
