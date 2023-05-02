import { TouchableOpacityProps } from 'react-native/types'

export type ButtonProps = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}
