import { useRef, useState } from 'react'
import { Alert, ScrollView, TextInput } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useUser } from '@realm/react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import * as C from './components'
import * as S from './styles'
import { licensePlateValidate } from '../../utils/licensePlateValidate'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'

export function Departure() {
  const [licensePlate, setLicensePlate] = useState('')
  const [description, setDescription] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const { goBack } = useNavigation()
  const realm = useRealm()
  const user = useUser()

  const licensePlateRef = useRef<TextInput>(null)
  const descriptionRef = useRef<TextInput>(null)

  const onRegisterDeparture = () => {
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

      setIsRegistering(true)

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate,
            description,
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

  return (
    <S.Container>
      <Header title="Saída" />
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <S.Content>
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
