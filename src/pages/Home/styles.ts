import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.COLORS.GRAY_800};
  `}
`
export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    margin-bottom: 12px;
  `}
`

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_400};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    margin-top: 32px;
    text-align: center;
  `}
`
