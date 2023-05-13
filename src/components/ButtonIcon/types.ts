import { IconProps } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native/types'

export type IconBoxProps = (props: IconProps) => JSX.Element

export type ButtonIconProps = TouchableOpacityProps & {
  icon: IconBoxProps
}
