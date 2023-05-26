import { useTheme } from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TopMessageProps } from './types'
import * as S from './styles'

export function TopMessage(props: TopMessageProps) {
  const { message, icon: Icon } = props
  const { COLORS } = useTheme()
  const { top } = useSafeAreaInsets()
  return (
    <S.Container style={{ paddingTop: top + 5 }}>
      {Icon && <Icon size={12} color={COLORS.GRAY_100} />}
      <S.Title>{message}</S.Title>
    </S.Container>
  )
}
