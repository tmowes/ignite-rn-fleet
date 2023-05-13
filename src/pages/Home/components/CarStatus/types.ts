import { TouchableOpacityProps } from 'react-native'

export type CarStatusProps = TouchableOpacityProps & {
  licensePlate?: string | null
}
