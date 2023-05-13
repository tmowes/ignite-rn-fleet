import { forwardRef } from 'react'
import { TextInput } from 'react-native'

import { useTheme } from 'styled-components'

import * as S from './styles'
import { LicensePlateInputProps } from './types'

export const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>((props, ref) => {
  const { label, ...attrs } = props
  const { COLORS } = useTheme()

  return (
    <S.Container>
      <S.Label>{label}</S.Label>

      <S.Input
        ref={ref}
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={COLORS.GRAY_400}
        {...attrs}
      />
    </S.Container>
  )
})
