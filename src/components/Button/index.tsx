import * as S from './styles'
import { ButtonProps } from './types'

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
  return (
    <S.Container activeOpacity={0.7} disabled={isLoading} {...rest}>
      {isLoading ? <S.Loading /> : <S.Title>{title}</S.Title>}
    </S.Container>
  )
}
