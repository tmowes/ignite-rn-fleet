import styled, { css } from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  ${({ theme }) => css`
    height: 56px;
    width: 56px;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    background-color: ${theme.COLORS.GRAY_600};
  `}
`
