import styled, { css } from 'styled-components/native'

export const Container = styled.ImageBackground`
  ${({ theme }) => css`
    flex: 1;
    justify-content: center;
    padding: 52px;
    background-color: ${theme.COLORS.GRAY_800};
  `}
`

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.BRAND_LIGHT};
    font-size: ${theme.FONT_SIZE.XXXL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    text-align: center;
  `}
`

export const Slogan = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    text-align: center;
    margin-bottom: 32px;
  `}
`
