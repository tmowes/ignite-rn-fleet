import { TouchableOpacityProps } from 'react-native'

export type HistoricCardProps = TouchableOpacityProps & {
  data: HistoricCardData
}

export type HistoricCardData = {
  id: string
  licensePlate: string
  created: string
  isSync: boolean
}
