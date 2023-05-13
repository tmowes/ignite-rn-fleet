import { Key, Car } from 'phosphor-react-native'
import { useTheme } from 'styled-components'

import * as S from './styles'
import { CarStatusProps } from './types'

export function CarStatus(props: CarStatusProps) {
  const { licensePlate = null, ...attrs } = props
  const { COLORS } = useTheme()

  const Icon = licensePlate ? Car : Key
  const message = licensePlate ? `Veículo ${licensePlate} em uso. ` : 'Nenhum veículo em uso. '
  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <S.Container {...attrs}>
      <S.IconBox>
        <Icon size={48} color={COLORS.BRAND_LIGHT} />
      </S.IconBox>
      <S.Message>
        {message}
        <S.TextHighlight>Clique aqui para registrar a {status}.</S.TextHighlight>
      </S.Message>
    </S.Container>
  )
}
