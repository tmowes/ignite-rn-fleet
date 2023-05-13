import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  ${({ theme }) => css`
    width: 100%;
    padding: 16px;
    border-radius: 6px;
    background-color: ${theme.COLORS.GRAY_700};
  `}
`

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_300};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`

export const Input = styled.TextInput`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    vertical-align: top;
    margin-top: 16px;
  `}
`
