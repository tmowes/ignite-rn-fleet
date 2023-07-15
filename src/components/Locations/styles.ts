import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
`

export const Line = styled.View`
  ${({ theme }) => css`
    height: 64px;
    width: 1px;
    margin: -2px;
    margin-left: 23px;
    border-width: 1px;
    border-left-color: ${theme.COLORS.GRAY_400};
  `};
`
