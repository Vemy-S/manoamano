import React, { useEffect } from 'react'
import { Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import { getDevices } from '../services/device'
import { useDeviceStore } from '../zustand/useDeviceStore'
import DeviceItem from '../components/DeviceItem'
import { useFeed } from '../hooks/useFeed'
import BackButton from '../components/BackButton'
import { useAuthStore } from '../zustand/useAuthStore'

export default function DevicesScreen() {
  const setUserDevices = useDeviceStore(state => state.setUserDevices)
  const userDevices = useDeviceStore(state => state.userDevices)
  const { onRefresh, refreshing } = useFeed()
  const myDevice = useAuthStore(state => state.user.device_id)

  const fetchDevices = async () => {
    const devices = await getDevices()
    if (devices !== undefined) {
      setUserDevices(devices.data)
    }
  }

  useEffect(() => {
    fetchDevices()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton
        href='/feed'
      />
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text className="text-2xl font-bold mb-4 text-gray-800">Dispositivo conectado </Text>
        <Text className='text-gray-600 font-bold'>Mi dispositivo: { myDevice }</Text>
        {userDevices.map((device) => (
          <DeviceItem key={device.device_id} device={device} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
