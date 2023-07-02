import { useRef } from 'react'

import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'
import { Car, FlagCheckered } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'

import { MapProps } from './types'
import { IconBox } from '../IconBox'

export function Map(props: MapProps) {
  const { coordinates, ...rest } = props
  const { COLORS } = useTheme()
  const mapRef = useRef<MapView>(null)

  const lastCoordinate = coordinates[coordinates.length - 1]

  const onMapLoaded = async () => {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(['departure', 'arrival'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      })
    }
  }

  return (
    <MapView
      ref={mapRef}
      onMapLoaded={onMapLoaded}
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: 200 }}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <IconBox size="SMALL" icon={Car} />
      </Marker>
      {coordinates.length > 1 && (
        <>
          <Marker identifier="arrival" coordinate={lastCoordinate}>
            <IconBox size="SMALL" icon={FlagCheckered} />
          </Marker>
          <Polyline
            coordinates={[...coordinates]}
            strokeColor={COLORS.GRAY_700}
            strokeWidth={7}
          />
        </>
      )}
    </MapView>
  )
}
