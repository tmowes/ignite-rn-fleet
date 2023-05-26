import { Alert } from 'react-native'
import { useEffect, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import { BSON } from 'realm'

import * as S from './styles'
import { RouteParamProps } from './types'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { ButtonIcon } from '../../components/ButtonIcon'
import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { getLastAsyncTimestamp } from '../../libs/asyncStorage/sync'

export function Arrival() {
  const { params } = useRoute()
  const { goBack } = useNavigation()
  const realm = useRealm()
  const [dataNotSynced, setDataNotSynced] = useState(false)

  const { id } = params as RouteParamProps
  const historic = useObject(Historic, new BSON.UUID(id))

  const onRemoveVehicleUsage = () => {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => removeVehicleUsage() },
    ])
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })

    goBack()
  }

  const onArrivalRegister = () => {
    try {
      if (!historic) {
        Alert.alert(
          'Erro',
          'Não foi possível obter os dados para registrar a chegada do veículo.',
        )
        return
      }

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
      })

      Alert.alert('Chegada', 'Chegada registrada com sucesso.')
      goBack()
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registar a chegada do veículo.')
    }
  }

  useEffect(() => {
    getLastAsyncTimestamp().then((lastSync) =>
      setDataNotSynced(historic!.updated_at.getTime() > lastSync),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.Container>
      <Header title="Chegada" />
      <S.Content>
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
