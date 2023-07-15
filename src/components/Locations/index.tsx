import { Car, FlagCheckered } from 'phosphor-react-native'

import { LocationInfo } from '../LocationInfo'
import * as S from './styles'
import { LocationsProps } from './types'

export function Locations(props: LocationsProps) {
  const { departure, arrival = null } = props
  return (
    <S.Container>
      <LocationInfo icon={Car} label={departure.label} description={departure.description} />

      {arrival && (
        <>
          <S.Line />
          <LocationInfo
            icon={FlagCheckered}
            label={arrival.label}
            description={arrival.description}
          />
        </>
      )}
    </S.Container>
  )
}
