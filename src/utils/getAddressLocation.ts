import { reverseGeocodeAsync } from 'expo-location'

type GetAddressLocationProps = {
  latitude: number
  longitude: number
}

export async function getAddressLocation(props: GetAddressLocationProps) {
  const { latitude, longitude } = props
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude })
    return addressResponse[0]?.street
  } catch (error) {
    console.log(error)
    return null
  }
}
