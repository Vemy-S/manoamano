import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Device } from '../types'
import { getDeviceIcon } from '../utils/getDeviceIcon'
import { logout, logoutExternalDevice } from '../services/auth'
import { useAuthStore } from '../zustand/useAuthStore'
import { useRouter } from 'expo-router'

type DeviceItemProps = {
  device: Device
}

export default function DeviceItem({ device }: DeviceItemProps) {
  const iconName = getDeviceIcon(device.platform) 
  const myDevice = useAuthStore(state => state.user.device_id)
  const router = useRouter()
  const setExternalLogout = useAuthStore(state => state.externalLogout)

  const handleLogout = async () => {
    if (myDevice !== null) {
        try {
            const result = await logoutExternalDevice(device.device_id, myDevice)

            console.log('Resultado del logout externo:', result)

            if (result.data && result.data.logout_device_id === myDevice) {
                setExternalLogout()
                await logout()
                router.push('/login')
                return
            }
        } catch (error) {
            console.error('Error durante el proceso de logout externo:', error)
        }
    } else {
        console.log('No hay dispositivo actual para desloguear')
    }
}

  return (
    <View className="flex-row items-center p-4 bg-white rounded-lg mb-2 shadow">
      <MaterialCommunityIcons name={iconName} size={40} color="#4B5563" className="mr-4" />
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-800">{device.deviceIdentifier}</Text>
        <Text className="text-sm text-gray-600">ID: {device.device_id}</Text>
        <Text className="text-sm text-gray-600">Plataforma: {device.platform}</Text>
        <Text className="text-sm text-gray-600">Versión: {device.deviceVersion}</Text>
      </View>
      <TouchableOpacity
        onPress={handleLogout}
        className="ml-4 bg-red-500 rounded-lg px-4 py-2"
      >
        <Text className="text-white font-bold">Cerrar</Text>
      </TouchableOpacity>
    </View>
  )
}