import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  ${({ theme }) => css`
    width: 100%;
    padding: 32px;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${theme.COLORS.GRAY_700};
    z-index: 1;
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`
