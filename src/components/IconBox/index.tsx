import { useTheme } from 'styled-components'

import * as S from './styles'
import { IconBoxProps } from './types'

export function IconBox(props: IconBoxProps) {
  const { icon: Icon, size = 'NORMAL' } = props
  const { COLORS } = useTheme()

  const iconSize = size === 'NORMAL' ? 24 : 16

  return (
    <S.Container size={size}>
      <Icon size={iconSize} color={COLORS.BRAND_LIGHT} />
    </S.Container>
  )
}
