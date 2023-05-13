import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'

import { useQuery, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import * as C from './components'
import * as S from './styles'
import { HistoricCardData } from './components/HistoricCard/types'

export function Home() {
  const { navigate } = useNavigation()
  const historic = useQuery(Historic)
  const realm = useRealm()
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardData[]>([])

  const onRegisterMovement = () => {
    if (vehicleInUse?._id) {
      navigate('arrival', { id: vehicleInUse._id.toString() })
    } else {
      navigate('departure')
    }
  }

  const fetchHistoric = useCallback(() => {
    try {
      const response = historic.filtered("status='arrival' SORT(created_at DESC)")
      const formattedHistoric = response.map((item) => ({
        id: item._id.toString(),
        licensePlate: item.license_plate,
        isSync: false,
        created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm'),
      }))
      setVehicleHistoric(formattedHistoric)
    } catch (error) {
      console.error(error)
      Alert.alert('Histórico', 'Não foi possível carregar o histórico.')
    }
  }, [historic])

  const fetchVehicleInUse = useCallback(() => {
    try {
      const vehicle = historic.filtered("status='departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.')
      console.error(error)
    }
  }, [historic])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())
    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse)
      }
    }
  }, [fetchVehicleInUse, realm])

  useEffect(() => {
    fetchVehicleInUse()
  }, [fetchVehicleInUse])

  useEffect(() => {
    fetchHistoric()
  }, [fetchHistoric])

  return (
    <S.Container>
      <C.Header />
      <S.Content>
        <C.CarStatus licensePlate={vehicleInUse?.license_plate} onPress={onRegisterMovement} />
        <S.Title>Histórico</S.Title>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <C.HistoricCard data={item} onPress={() => navigate('arrival', { id: item.id })} />
          )}
          ListEmptyComponent={<S.Label>Nenhum registro de utilização.</S.Label>}
        />
      </S.Content>
    </S.Container>
  )
}
