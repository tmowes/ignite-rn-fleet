import { useEffect, useRef, useState } from 'react'
import { Alert, ScrollView, TextInput } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useUser } from '@realm/react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  LocationAccuracy,
  LocationSubscription,
  useForegroundPermissions,
  watchPositionAsync,
  LocationObjectCoords,
  requestBackgroundPermissionsAsync,
} from 'expo-location'
import { CarSimple } from 'phosphor-react-native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import * as C from './components'
import * as S from './styles'
import { licensePlateValidate } from '../../utils/licensePlateValidate'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { getAddressLocation } from '../../utils/getAddressLocation'
import { Loading } from '../../components/Loading'
import { LocationInfo } from '../../components/LocationInfo'
import { Map } from '../../components/Map'
import { startLocationTask } from '../../tasks/location'
import { openSettings } from '../../utils/openSettings'

export function Departure() {
  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null)
  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions()
  const { goBack } = useNavigation()
  const realm = useRealm()
  const user = useUser()

  const licensePlateRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)

  const onRegisterDeparture = async () => {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()
        Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informa a placa correta.')
        return
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus()
        Alert.alert('Finalidade', 'Por favor, informe a finalidade da utilização do veículo')
        return
      }

      if (!currentCoords?.latitude && !currentCoords?.longitude) {
        Alert.alert(
          'Localização',
          'Não foi possível obter a localização atual. Tente novamente.',
        )
        return
      }

      setIsRegistering(true)

      const backgroundPermissions = await requestBackgroundPermissionsAsync()

      if (!backgroundPermissions.granted) {
        setIsRegistering(false)
        Alert.alert(
          'Localização',
          'É necessário permitir que o App tenha acesso localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo."',
          [{ text: 'Abrir configurações', onPress: openSettings }],
        )
        return
      }

      await startLocationTask()

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate,
            description,
            coords: [
              {
                latitude: currentCoords.latitude,
                longitude: currentCoords.longitude,
                timestamp: new Date().getTime(),
              },
            ],
          }),
        )
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso.')

      goBack()
    } catch (error) {
      console.error(error)
      Alert.alert('Erro', 'Não possível registrar a saída do veículo.')
      setIsRegistering(false)
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return
    }

    let subscription: LocationSubscription

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
      },
      ({ coords }) => {
        setCurrentCoords(coords)
        getAddressLocation(coords)
          .then((address) => {
            if (address) {
              setCurrentAddress(address)
            }
          })
          .finally(() => setIsLoadingLocation(false))
      },
    ).then((response) => {
      subscription = response
    })

    // eslint-disable-next-line consistent-return
    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [locationForegroundPermission?.granted])

  if (!locationForegroundPermission?.granted) {
    return (
      <S.Container>
        <Header title="Saída" />
        <S.MessageContent>
          <S.Message>
            Você precisa permitir que o aplicativo tenha acesso a localização para acessar essa
            funcionalidade. Por favor, acesse as configurações do seu dispositivo para conceder
            a permissão ao aplicativo.
          </S.Message>
          <Button title="Abrir configurações" onPress={openSettings} />
        </S.MessageContent>
      </S.Container>
    )
  }

  if (isLoadingLocation) {
    return <Loading />
  }

  return (
    <S.Container>
      <Header title="Saída" />
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          {currentCoords && <Map coordinates={[currentCoords]} />}
          <S.Content>
            {currentAddress && (
              <LocationInfo
                icon={CarSimple}
                label="Localização atual"
                description={currentAddress}
              />
            )}
            <C.LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onChangeText={setLicensePlate}
              onSubmitEditing={() => {
                descriptionRef.current?.focus()
              }}
              returnKeyType="next"
            />
            <C.TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onChangeText={setDescription}
              onSubmitEditing={onRegisterDeparture}
              returnKeyType="send"
              blurOnSubmit
            />
            <Button
              title="Registar Saída"
              onPress={onRegisterDeparture}
              isLoading={isRegistering}
            />
          </S.Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </S.Container>
  )
}
