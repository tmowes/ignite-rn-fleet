import { IconProps } from 'phosphor-react-native'

export type TopMessageProps = {
  message: string
  icon?: (props: IconProps) => JSX.Element
}
