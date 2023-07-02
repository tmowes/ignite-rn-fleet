import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'

import { CloudArrowUp } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import Toast from 'react-native-toast-message'
import { useUser } from '@realm/react'

import { useQuery, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import * as C from './components'
import * as S from './styles'
import { HistoricCardData } from './components/HistoricCard/types'
import { getLastAsyncTimestamp, saveLastSyncTimestamp } from '../../libs/asyncStorage/sync'
import { TopMessage } from '../../components/TopMessage'

export function Home() {
  const { navigate } = useNavigation()
  const historic = useQuery(Historic)
  const user = useUser()
  const realm = useRealm()
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardData[]>([])
  const [percetageToSync, setPercentageToSync] = useState<string | null>(null)

  const onRegisterMovement = () => {
    if (vehicleInUse?._id) {
      navigate('arrival', { id: vehicleInUse._id.toString() })
    } else {
      navigate('departure')
    }
  }

  const fetchHistoric = useCallback(async () => {
    try {
      const response = historic.filtered("status='arrival' SORT(created_at DESC)")
      const lastSync = await getLastAsyncTimestamp()
      const formattedHistoric = response.map((item) => ({
        id: item._id.toString(),
        licensePlate: item.license_plate,
        isSync: lastSync > item.updated_at!.getTime(),
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

  const progressNotification = useCallback(
    async (transferred: number, transferable: number) => {
      const percentage = (transferred / transferable) * 100
      if (percentage === 100) {
        await saveLastSyncTimestamp()
        await fetchHistoric()
        setPercentageToSync(null)
        Toast.show({ type: 'info', text1: 'Todos os dados estão sincronizado.' })
      }
      if (percentage < 100) {
        setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`)
      }
    },
    [fetchHistoric],
  )

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

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realmSub) => {
      const historicByUserQuery = realmSub
        .objects('Historic')
        .filtered(`user_id = '${user!.id}'`)

      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realm])

  useEffect(() => {
    const { syncSession } = realm

    if (syncSession) {
      syncSession.addProgressNotification(
        Realm.ProgressDirection.Upload,
        Realm.ProgressMode.ReportIndefinitely,
        progressNotification,
      )
    }

    return () => syncSession?.removeProgressNotification(progressNotification)
  }, [progressNotification, realm])

  return (
    <S.Container>
      {percetageToSync && <TopMessage message={percetageToSync} icon={CloudArrowUp} />}
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
