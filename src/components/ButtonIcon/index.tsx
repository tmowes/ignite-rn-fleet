import { useTheme } from 'styled-components/native'

import * as S from './styles'
import { ButtonIconProps } from './types'

export function ButtonIcon(props: ButtonIconProps) {
  const { icon: Icon, ...attrs } = props
  const { COLORS } = useTheme()

  return (
    <S.Container activeOpacity={0.7} {...attrs}>
      <Icon size={24} color={COLORS.BRAND_MID} />
    </S.Container>
  )
}
