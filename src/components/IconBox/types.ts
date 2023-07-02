import { IconProps as PhosphorIconProps } from 'phosphor-react-native'

export type IconProps = (props: PhosphorIconProps) => JSX.Element

export type SizeProps = 'SMALL' | 'NORMAL'

export type IconBoxProps = {
  size?: SizeProps
  icon: IconProps
}
