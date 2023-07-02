import { IconBox } from '../IconBox'
import * as S from './styles'
import { LocationInfoProps } from './types'

export function LocationInfo(props: LocationInfoProps) {
  const { label, description, icon } = props
  return (
    <S.Container>
      <IconBox icon={icon} />
      <S.Info>
        <S.Label numberOfLines={1}>{label}</S.Label>
        <S.Description numberOfLines={1}>{description}</S.Description>
      </S.Info>
    </S.Container>
  )
}
