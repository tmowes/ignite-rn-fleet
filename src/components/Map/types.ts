import { MapViewProps, LatLng } from 'react-native-maps'

export type MapProps = MapViewProps & {
  coordinates: LatLng[]
}
