import styled, { css } from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  ${({ theme }) => css`
    width: 100%;
    margin: 32px 0;
    padding: 22px;
    border-radius: 6px;
    background-color: ${theme.COLORS.GRAY_700};
    flex-direction: row;
    align-items: center;
  `}
`

export const IconBox = styled.View`
  ${({ theme }) => css`
    width: 77px;
    height: 77px;
    border-radius: 6px;
    background-color: ${theme.COLORS.GRAY_600};
    margin-right: 12px;
    justify-content: center;
    align-items: center;
  `}
`

export const Message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    flex: 1;
    text-align: justify;
    /* text-align-vertical: center; */
    textalignvertical: center;
  `}
`

export const TextHighlight = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.BRAND_LIGHT};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`
