import { Alert } from 'react-native'
import { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import { BSON } from 'realm'
import { LatLng } from 'react-native-maps'

import * as S from './styles'
import { RouteParamProps } from './types'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { ButtonIcon } from '../../components/ButtonIcon'
import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { getLastAsyncTimestamp } from '../../libs/asyncStorage/sync'
import { getStorageLocations } from '../../libs/asyncStorage/location'
import { Map } from '../../components/Map'
import { stopLocationTask } from '../../tasks/location'
import { Locations } from '../../components/Locations'
import { LocationInfoProps } from '../../components/LocationInfo/types'
import { getAddressLocation } from '../../utils/getAddressLocation'
import { Loading } from '../../components/Loading'

export function Arrival() {
  const { params } = useRoute()
  const { goBack } = useNavigation()
  const realm = useRealm()
  const [dataNotSynced, setDataNotSynced] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng[]>([])
  const [departure, setDeparture] = useState<LocationInfoProps>({} as LocationInfoProps)
  const [arrival, setArrival] = useState<LocationInfoProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = params as RouteParamProps
  const historic = useObject(Historic, new BSON.UUID(id))

  const onRemoveVehicleUsage = () => {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => removeVehicleUsage() },
    ])
  }

  const removeVehicleUsage = async () => {
    realm.write(() => {
      realm.delete(historic)
    })
    await stopLocationTask()
    goBack()
  }

  const onArrivalRegister = async () => {
    try {
      if (!historic) {
        Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo.',
        )
        return
      }

      const locations = await getStorageLocations()

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
        historic.coords.push(...locations)
      })
      await stopLocationTask()
      Alert.alert('Chegada', 'Chegada registrada com sucesso.')
      goBack()
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registar a chegada do veículo.')
    }
  }

  const getLocationsInfo = async () => {
    if (!historic) return
    const lastSync = await getLastAsyncTimestamp()
    const updatedAt = historic!.updated_at.getTime()
    setDataNotSynced(updatedAt > lastSync)

    if (historic?.status === 'departure') {
      const locationsStorage = await getStorageLocations()
      setCoordinates(locationsStorage)
    } else {
      setCoordinates(historic?.coords ?? [])
    }

    if (historic?.coords[0]) {
      const departureStreetName = await getAddressLocation(historic?.coords[0])

      setDeparture({
        label: `Saindo em ${departureStreetName ?? ''}`,
        description: dayjs(new Date(historic?.coords[0].timestamp)).format(
          'DD/MM/YYYY [às] HH:mm',
        ),
      })
    }

    if (historic?.status === 'arrival') {
      const lastLocation = historic.coords[historic.coords.length - 1]
      const arrivalStreetName = await getAddressLocation(lastLocation)
      setArrival({
        label: `Chegando em ${arrivalStreetName ?? ''}`,
        description: dayjs(new Date(lastLocation.timestamp)).format('DD/MM/YYYY [às] HH:mm'),
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getLocationsInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historic])

  if (isLoading) {
    return <Loading />
  }

  return (
    <S.Container>
      <Header title="Chegada" />
      {coordinates.length > 0 && <Map coordinates={coordinates} />}
      <S.Content>
        <Locations departure={departure} arrival={arrival} />
        <S.Label>Placa do veículo</S.Label>
        <S.LicensePlate>{historic?.license_plate}</S.LicensePlate>
        <S.Label>Finalidade</S.Label>
        <S.Description>{historic?.description}</S.Description>
      </S.Content>
      {historic?.status === 'departure' && (
        <S.Footer>
          <ButtonIcon icon={X} onPress={onRemoveVehicleUsage} />
          <Button title="Registrar chegada" onPress={onArrivalRegister} />
        </S.Footer>
      )}
      {dataNotSynced && (
        <S.AsyncMessage>
          Sincronização da {historic?.status === 'departure' ? 'partida' : 'chegada'} pendente
        </S.AsyncMessage>
      )}
    </S.Container>
  )
}
