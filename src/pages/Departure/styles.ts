import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.COLORS.GRAY_800};
  `}
`

export const Content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
  margin-top: 16px;
`

export const Message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    text-align: center;
    margin-bottom: 40px;
  `}
`

export const MessageContent = styled.View`
  flex: 1;
  justify-content: center;
  padding: 24px;
`
