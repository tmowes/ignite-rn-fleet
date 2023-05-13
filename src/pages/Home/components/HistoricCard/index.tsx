import { Check, ClockClockwise } from 'phosphor-react-native'
import { useTheme } from 'styled-components'

import * as S from './styles'
import { HistoricCardProps } from './types'

export function HistoricCard(props: HistoricCardProps) {
  const { data, ...attrs } = props
  const { licensePlate, created, isSync } = data
  const { COLORS } = useTheme()

  return (
    <S.Container {...attrs}>
      <S.Info>
        <S.LicensePlate>{licensePlate}</S.LicensePlate>
        <S.Departure>{created}</S.Departure>
      </S.Info>
      {isSync ? (
        <Check size={24} color={COLORS.BRAND_LIGHT} />
      ) : (
        <ClockClockwise size={24} color={COLORS.GRAY_400} />
      )}
    </S.Container>
  )
}
