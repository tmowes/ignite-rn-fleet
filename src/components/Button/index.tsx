import { Container, Loading, Title } from './styles'
import { ButtonProps } from './types'

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
  return (
    <Container activeOpacity={0.7} disabled={isLoading} {...rest}>
      {isLoading ? <Loading /> : <Title>{title}</Title>}
    </Container>
  )
}
