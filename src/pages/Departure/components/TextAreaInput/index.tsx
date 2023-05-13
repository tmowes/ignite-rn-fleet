import { forwardRef } from 'react'
import { TextInput } from 'react-native'

import { useTheme } from 'styled-components'

import * as S from './styles'
import { TextAreaInputProps } from './types'

export const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>((props, ref) => {
  const { label, ...attrs } = props
  const { COLORS } = useTheme()

  return (
    <S.Container>
      <S.Label>{label}</S.Label>

      <S.Input
        ref={ref}
        multiline
        autoCapitalize="sentences"
        placeholderTextColor={COLORS.GRAY_400}
        {...attrs}
      />
    </S.Container>
  )
})
