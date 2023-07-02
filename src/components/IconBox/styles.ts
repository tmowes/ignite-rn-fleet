import styled, { css } from 'styled-components/native'

import { SizeProps } from './types'

const variantSizeStyles = (size: SizeProps) =>
  ({
    SMALL: css`
      width: 32px;
      height: 32px;
    `,
    NORMAL: css`
      width: 46px;
      height: 46px;
    `,
  }[size])

export const Container = styled.View<{ size: SizeProps }>`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  ${({ size }) => variantSizeStyles(size)}
`
